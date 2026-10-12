import { useMemo, useState } from "react";

const initialMeals = [
  { id: 1, name: "Breakfast", detail: "Eggs, oats & banana", calories: 420, protein: 25, carbs: 48, fat: 14 },
  { id: 2, name: "Lunch", detail: "Chicken, rice & vegetables", calories: 610, protein: 42, carbs: 66, fat: 16 },
  { id: 3, name: "Snack", detail: "Greek yogurt & almonds", calories: 220, protein: 15, carbs: 18, fat: 10 }
];
const targets = { calories: 2200, protein: 140, carbs: 220, fat: 65 };

function MacroBar({ label, value, goal, color }) {
  const percent = Math.min(100, goal ? value / goal * 100 : 0);
  return <div className="macro-item">
    <div className="macro-heading"><span className="macro-dot" style={{ background: color }} />
      <span>{label}</span><strong>{value} / {goal} g</strong></div>
    <div className="progress-track" role="progressbar" aria-label={label}
      aria-valuenow={value} aria-valuemin="0" aria-valuemax={goal}>
      <div className="progress-fill" style={{ width: `${percent}%`, background: color }} />
    </div>
  </div>;
}

export default function App() {
  const [meals, setMeals] = useState(initialMeals);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  const totals = useMemo(() => meals.reduce((acc, m) => ({
    calories: acc.calories + m.calories, protein: acc.protein + m.protein,
    carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 }), [meals]);
  const remaining = Math.max(0, targets.calories - totals.calories);
  const percent = Math.min(100, totals.calories / targets.calories * 100);

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function submitMeal(event) {
    event.preventDefault();
    const name = form.name.trim();
    const nums = ["calories", "protein", "carbs", "fat"].map(k => Number(form[k]));
    if (!name || name.length > 80 || form.calories === "" ||
        nums.some((n, i) => !Number.isFinite(n) || n < 0 || n > (i === 0 ? 10000 : 1000))) {
      setNotice("Enter a meal name and valid non-negative nutrition values.");
      return;
    }
    setMeals(prev => [...prev, {
      id: crypto.randomUUID(), name, detail: "Custom meal",
      calories: nums[0], protein: nums[1], carbs: nums[2], fat: nums[3]
    }]);
    setForm({ name: "", calories: "", protein: "", carbs: "", fat: "" });
    setFormOpen(false);
    setNotice("Meal added to this demo session.");
  }
  const closeMenu = () => setMenuOpen(false);

  return <div className="app-shell">
    {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={closeMenu} />}
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <a className="brand" href="#dashboard" onClick={closeMenu}><span className="brand-icon">F</span>
        <span>Forma<span className="brand-accent">Fit</span></span></a>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="Main navigation">
        <a className="nav-link active" href="#dashboard" onClick={closeMenu}>▦ Dashboard</a>
        <a className="nav-link" href="#nutrition" onClick={closeMenu}>◉ Nutrition</a>
        <a className="nav-link" href="#activity" onClick={closeMenu}>↗ Activity</a>
        <a className="nav-link" href="#goals" onClick={closeMenu}>◎ Goals</a>
      </nav>
      <div className="sidebar-bottom"><span className="avatar">U</span><div><strong>Your profile</strong><p>Demo dashboard</p></div></div>
    </aside>

    <main className="main-content" id="dashboard">
      <header className="topbar">
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}>☰</button>
        <div><p className="eyebrow">YOUR HEALTH, IN FOCUS</p><h1>Daily Overview</h1>
          <p className="muted">Small habits. Meaningful progress.</p></div>
        <div className="today-chip">{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</div>
      </header>

      {notice && <div className="notice" role="status" aria-live="polite"><span>{notice}</span>
        <button onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}

      <section className="stats-grid" aria-label="Daily nutrition summary">
        <article className="glass-card calorie-card">
          <div className="card-topline"><span className="card-label">Calories consumed</span><span className="card-icon">◉</span></div>
          <div className="calorie-number">{totals.calories.toLocaleString()} <span>kcal</span></div>
          <div className="calorie-track"><div style={{ width: `${percent}%` }} /></div>
          <div className="split-labels"><span>{Math.round(percent)}% of daily goal</span><span>{targets.calories.toLocaleString()} kcal</span></div>
          <div className="remaining-box"><span>Calories remaining</span><strong>{remaining.toLocaleString()} kcal</strong></div>
        </article>
        <article className="glass-card" id="nutrition">
          <div className="card-topline"><span className="card-label">Nutrition balance</span><span className="card-icon green">✳</span></div>
          <div className="macro-list">
            <MacroBar label="Protein" value={totals.protein} goal={targets.protein} color="#10b981" />
            <MacroBar label="Carbs" value={totals.carbs} goal={targets.carbs} color="#60a5fa" />
            <MacroBar label="Fat" value={totals.fat} goal={targets.fat} color="#fbbf24" />
          </div><p className="footnote">Sample targets — customize before personal use.</p>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass-card" id="activity">
          <div className="section-heading"><div><p className="eyebrow">DAILY MOVEMENT</p><h2>Activity summary</h2></div><span className="card-icon blue">↗</span></div>
          <div className="activity-grid">
            <div className="activity-tile"><span className="activity-symbol">⌁</span><strong>6,420</strong><span>Steps</span><div className="mini-track"><div style={{ width: "64%" }} /></div><small>Goal: 10,000</small></div>
            <div className="activity-tile"><span className="activity-symbol">◷</span><strong>32 min</strong><span>Active time</span><div className="mini-track blue-track"><div style={{ width: "80%" }} /></div><small>Goal: 40 min</small></div>
            <div className="activity-tile"><span className="activity-symbol">♨</span><strong>1.5 L</strong><span>Water</span><div className="mini-track amber-track"><div style={{ width: "60%" }} /></div><small>Goal: 2.5 L</small></div>
          </div><p className="footnote">Activity values are sample data, not live device readings.</p>
        </article>

        <article className="glass-card meals-card">
          <div className="section-heading"><div><p className="eyebrow">FUEL YOUR DAY</p><h2>Today's meals</h2></div>
            <button className="primary-button" onClick={() => { setFormOpen(v => !v); setNotice(""); }}>{formOpen ? "Cancel" : "+ Add meal"}</button></div>
          {formOpen && <form className="meal-form" onSubmit={submitMeal}>
            <label>Meal name<input name="name" value={form.name} onChange={updateForm} maxLength="80" required /></label>
            <div className="form-grid">
              <label>Calories (kcal)<input name="calories" type="number" min="0" max="10000" value={form.calories} onChange={updateForm} required /></label>
              <label>Protein (g)<input name="protein" type="number" min="0" max="1000" value={form.protein} onChange={updateForm} required /></label>
              <label>Carbs (g)<input name="carbs" type="number" min="0" max="1000" value={form.carbs} onChange={updateForm} required /></label>
              <label>Fat (g)<input name="fat" type="number" min="0" max="1000" value={form.fat} onChange={updateForm} required /></label>
            </div><button className="primary-button" type="submit">Save meal</button>
          </form>}
          <div className="meal-list">{meals.map(meal => <div className="meal-row" key={meal.id}>
            <div className="meal-symbol">◌</div><div className="meal-info"><strong>{meal.name}</strong><span>{meal.detail}</span></div>
            <strong className="meal-calories">{meal.calories.toLocaleString()} <small>kcal</small></strong></div>)}</div>
          {meals.length === 0 && <p className="muted">No meals yet. Add your first meal to begin.</p>}
          <div className="meal-total"><span>Total calories logged</span><strong>{totals.calories.toLocaleString()} kcal</strong></div>
        </article>
      </section>

      <section className="glass-card goals-card" id="goals"><div><p className="eyebrow">CONSISTENCY OVER PERFECTION</p>
        <h2>Keep building your routine.</h2><p className="muted">Log meals and activity regularly to understand your progress.</p></div>
        <a href="#nutrition" className="secondary-button">Review nutrition ↗</a></section>
      <footer className="footer"><span>© {new Date().getFullYear()} FormaFit</span>
        <div><a href="mailto:support@example.com">Contact</a><a href="#goals">Goals</a><a href="#dashboard">Back to top ↑</a></div></footer>
    </main>
  </div>;
}
