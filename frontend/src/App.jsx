
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search, MapPin, Compass, CalendarDays, Wallet,
  Plus, Trash2, Mountain, Menu, X, ArrowRight,
  Plane, Sparkles, ChevronDown
} from "lucide-react";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All India");
  const [selected, setSelected] = useState(null);
  const [showPlanner, setShowPlanner] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: ""
  });
  const [activityInputs, setActivityInputs] = useState({});

  const loadDestinations = async () => {
    try {
      const res = await axios.get(`${API}/destinations`);
      setDestinations(res.data);
    } catch {
      console.error("Could not load destinations");
    }
  };

  const loadTrips = async () => {
    try {
      const res = await axios.get(`${API}/trips`);
      setTrips(res.data);
    } catch {
      console.error("Could not load trips");
    }
  };

  useEffect(() => {
    loadDestinations();
    loadTrips();
  }, []);

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      `${d.name} ${d.state} ${d.description}`
        .toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      region === "All India" || d.region === region;

    return matchesSearch && matchesRegion;
  });

  const createTrip = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/trips`, {
        ...form,
        budget: Number(form.budget),
        activities: []
      });
      setForm({
        destination: "",
        startDate: "",
        endDate: "",
        budget: ""
      });
      setShowPlanner(false);
      loadTrips();
      alert("Your trip has been saved!");
    } catch {
      alert("Could not save trip. Check your backend.");
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await axios.delete(`${API}/trips/${id}`);
      loadTrips();
    } catch {
      alert("Could not delete trip.");
    }
  };

  const addActivity = async (id) => {
    const activity = activityInputs[id]?.trim();
    if (!activity) return;

    try {
      await axios.patch(`${API}/trips/${id}/activities`, {
        activity
      });
      setActivityInputs({ ...activityInputs, [id]: "" });
      loadTrips();
    } catch {
      alert("Could not add activity.");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">✦</span>
          <span>INCREDIBLE<span className="brand-india"> INDIA</span>
            <small>EXPLORE THE EXTRAORDINARY</small>
          </span>
        </a>

        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${mobileMenu ? "show-menu" : ""}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#destinations" onClick={() => setMobileMenu(false)}>Destinations</a>
          <a href="#planner" onClick={() => setMobileMenu(false)}>My Trips</a>
          <button className="nav-button" onClick={() => setShowPlanner(true)}>
            Plan a Trip <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={15} /> DISCOVER THE SOUL OF INDIA
          </div>
          <h1>One Country.<br /><span>A Million Stories.</span></h1>
          <p>
            From the mighty Himalayas to tropical coastlines,
            discover the colours, cultures and wonders of India.
          </p>
          <div className="hero-actions">
            <a href="#destinations" className="primary-button">
              Explore Destinations <ArrowRight size={17} />
            </a>
            <a href="#planner" className="secondary-button">
              Plan Your Journey
            </a>
          </div>
          <div className="hero-stats">
            <div><strong>28+</strong><span>States</span></div>
            <div><strong>1000+</strong><span>Experiences</span></div>
            <div><strong>1</strong><span>Incredible India</span></div>
          </div>
        </div>
        <div className="hero-caption">THE BEAUTY OF INDIA, WAITING TO BE EXPLORED</div>
      </section>

      <section className="intro section-wrap">
        <div>
          <span className="eyebrow">NAMASTE, TRAVELLER</span>
          <h2>Find your next <em>great escape.</em></h2>
        </div>
        <p>
          Whether you seek peaceful mountains, ancient monuments,
          vibrant cities or endless green landscapes, your next
          unforgettable journey begins here.
        </p>
      </section>

      <section className="destinations section-wrap" id="destinations">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE INDIA</span>
            <h2>Places worth <em>discovering.</em></h2>
          </div>
          <span className="destination-count">
            {filtered.length} DESTINATIONS
          </span>
        </div>

        <div className="search-bar">
          <Search size={20} />
          <input
            placeholder="Search places, states or experiences..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option>All India</option>
            <option>North India</option>
            <option>South India</option>
            <option>West India</option>
            <option>Northeast India</option>
          </select>
        </div>

        <div className="destination-grid">
          {filtered.map((d) => (
            <article className="destination-card" key={d.id}>
              <div className="destination-image">
                <img src={d.image} alt={d.name} />
                <span className="category-tag">{d.category}</span>
                <span className="image-region">{d.region}</span>
              </div>
              <div className="destination-info">
                <span className="destination-state">
                  <MapPin size={13} /> {d.state}
                </span>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <div className="destination-bottom">
                  <span><Wallet size={15} /> From ₹{Number(d.budget).toLocaleString("en-IN")}</span>
                  <button onClick={() => setSelected(d)}>
                    Explore <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            No destinations found. Try another search!
          </div>
        )}
      </section>

      <section className="experience">
        <div className="experience-content">
          <span className="eyebrow">THE NORTH EAST CALLS</span>
          <h2>Where mountains<br />meet the clouds.</h2>
          <p>
            Explore the emerald tea gardens of Assam, the living
            root bridges of Meghalaya and the breathtaking peaks
            of Sikkim.
          </p>
          <a href="#destinations" className="primary-button">
            Discover Northeast India <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="planner section-wrap" id="planner">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR TRAVEL DIARY</span>
            <h2>Journeys made <em>personal.</em></h2>
          </div>
          <button className="create-button" onClick={() => setShowPlanner(true)}>
            <Plus size={18} /> Create New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="empty-trips">
            <div className="empty-icon"><Plane size={30} /></div>
            <h3>Your next adventure starts here.</h3>
            <p>You haven't saved any trips yet. Start planning your Indian adventure!</p>
            <button className="primary-button" onClick={() => setShowPlanner(true)}>
              Plan My First Trip <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="trip-grid">
            {trips.map((trip) => (
              <div className="trip-card" key={trip._id}>
                <div className="trip-card-top">
                  <span className="eyebrow">SAVED ADVENTURE</span>
                  <button className="delete-button" onClick={() => deleteTrip(trip._id)}>
                    <Trash2 size={17} />
                  </button>
                </div>
                <h3>{trip.destination}</h3>
                <p><CalendarDays size={15} /> {trip.startDate || "Date not set"} – {trip.endDate || "Date not set"}</p>
                <p><Wallet size={15} /> Budget: ₹{Number(trip.budget || 0).toLocaleString("en-IN")}</p>
                <div className="activities">
                  <strong>Travel activities</strong>
                  {trip.activities?.map((activity, i) => (
                    <span key={i}>✓ {activity}</span>
                  ))}
                </div>
                <div className="activity-input">
                  <input
                    placeholder="Add an activity..."
                    value={activityInputs[trip._id] || ""}
                    onChange={(e) => setActivityInputs({
                      ...activityInputs,
                      [trip._id]: e.target.value
                    })}
                    onKeyDown={(e) => e.key === "Enter" && addActivity(trip._id)}
                  />
                  <button onClick={() => addActivity(trip._id)}><Plus size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="quote-section">
        <span>✦</span>
        <h2>"Travel is the only thing you buy that makes you richer."</h2>
        <p>LET INDIA SURPRISE YOU.</p>
      </section>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-icon">✦</span>
          <span>INCREDIBLE INDIA<small>EXPLORE THE EXTRAORDINARY</small></span>
        </a>
        <p>Made with ❤️ for the love of India.</p>
        <span>© 2026 Incredible India Tourist Guide</span>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal destination-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X /></button>
            <img src={selected.image} alt={selected.name} />
            <div className="modal-body">
              <span className="eyebrow">{selected.region} · {selected.state}</span>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <h4>Must-visit attractions</h4>
              <div className="attraction-list">
                {selected.attractions?.map((a) => <span key={a}>✦ {a}</span>)}
              </div>
              <button className="primary-button" onClick={() => {
                setForm({ ...form, destination: selected.name });
                setSelected(null);
                setShowPlanner(true);
              }}>
                Plan a trip here <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showPlanner && (
        <div className="modal-backdrop" onClick={() => setShowPlanner(false)}>
          <div className="modal planner-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPlanner(false)}><X /></button>
            <span className="eyebrow">START YOUR ADVENTURE</span>
            <h2>Plan your journey.</h2>
            <p>Every great story begins with a destination.</p>
            <form onSubmit={createTrip}>
              <label>Destination</label>
              <select required value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}>
                <option value="">Choose a destination</option>
                {destinations.map((d) => <option key={d.id} value={d.name}>{d.name}, {d.state}</option>)}
              </select>

              <div className="form-row">
                <div>
                  <label>Start date</label>
                  <input type="date" required value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div>
                  <label>End date</label>
                  <input type="date" required min={form.startDate}
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>

              <label>Estimated budget (₹)</label>
              <input type="number" min="1" placeholder="e.g. 15000" required
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })} />

              <button type="submit" className="primary-button submit-button">
                Save My Trip <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
