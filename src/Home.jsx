import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Moon, Info, Bell, Droplet, BookOpen, Zap, Lock, Heart, MessageCircle, Sun, Check, X } from 'lucide-react';

// Placeholder data
const placeholderLogs = [
  { date: '2025-04-20', flow: 'medium', symptoms: ['cramps', 'headache'], mood: 'tired' },
  { date: '2025-04-21', flow: 'heavy', symptoms: ['cramps', 'bloating'], mood: 'irritable' },
  { date: '2025-04-22', flow: 'heavy', symptoms: ['cramps'], mood: 'emotional' },
  { date: '2025-04-23', flow: 'medium', symptoms: ['headache'], mood: 'calm' },
  { date: '2025-04-24', flow: 'light', symptoms: [], mood: 'energetic' }
];

const educationalContent = [
  {
    id: 1,
    title: "Understanding Your Cycle",
    content: "The average menstrual cycle is 28 days, but can range from 21-35 days. It consists of four phases: menstruation, the follicular phase, ovulation, and the luteal phase.",
    icon: <Info size={24} />
  },
  {
    id: 2,
    title: "Managing Period Pain",
    content: "Heat therapy, gentle exercise, and staying hydrated can help manage menstrual cramps naturally. Over-the-counter pain relievers can also provide relief.",
    icon: <Heart size={24} />
  },
  {
    id: 3,
    title: "Menstrual Products Guide",
    content: "From pads and tampons to menstrual cups and period underwear, there are many options available. Finding what works best for your body and lifestyle is important.",
    icon: <Droplet size={24} />
  },
  {
    id: 4,
    title: "Exercise During Your Period",
    content: "Light to moderate exercise can help reduce cramps and boost endorphins. Listen to your body and adjust intensity as needed.",
    icon: <Zap size={24} />
  },
];

const mythsAndFacts = [
  {
    myth: "You shouldn't exercise during your period",
    fact: "Exercise can actually help relieve cramps and boost your mood through endorphin release"
  },
  {
    myth: "Period blood is dirty or impure",
    fact: "Menstrual blood is a natural combination of blood, tissue, and unfertilized egg cells"
  },
  {
    myth: "You can't get pregnant during your period",
    fact: "While less likely, pregnancy can occur if you have sex during your period, especially with shorter cycles"
  },
  {
    myth: "PMS symptoms are all psychological",
    fact: "PMS includes both physical and emotional symptoms caused by hormonal changes"
  },
  {
    myth: "Missing a period always means you're pregnant",
    fact: "Stress, weight changes, excessive exercise, and medical conditions can all cause missed periods"
  }
];

export default function HerCycle() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [savedPin, setSavedPin] = useState('1234'); // Default PIN for demo
  const [activeSection, setActiveSection] = useState('tracker');
  const [logs, setLogs] = useState(placeholderLogs);
  const [currentPeriodDay, setCurrentPeriodDay] = useState(5); // For demo: day 5 of period
  const [nextPeriod, setNextPeriod] = useState('May 18'); // For demo
  const [ovulationWindow, setOvulationWindow] = useState('May 4 - May 7'); // For demo
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Take iron supplement', time: '09:00', days: ['Mon', 'Wed', 'Fri'], active: true },
    { id: 2, title: 'Drink 8oz water', time: '12:00', days: ['everyday'], active: true },
    { id: 3, title: 'Change pad/tampon', time: '14:00', days: ['period days'], active: true }
  ]);
  const [newReminder, setNewReminder] = useState({ title: '', time: '12:00', days: [] });
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [todayLog, setTodayLog] = useState({
    flow: '',
    symptoms: [],
    mood: '',
    notes: ''
  });

  // Authenticate with PIN
  const handlePinSubmit = () => {
    if (pin === savedPin) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN. Try again.');
      setPin('');
    }
  };

  // Handle PIN input
  const handlePinChange = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
  };

  // Log out after 5 minutes of inactivity (simulated for demo)
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        // For demo purposes, we're not actually logging out
        // setIsAuthenticated(false);
        // setPin('');
      }, 300000); // 5 minutes
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Auto-submit PIN when 4 digits are entered
  useEffect(() => {
    if (pin.length === 4) {
      handlePinSubmit();
    }
  }, [pin]);

  // Add a new reminder
  const addReminder = () => {
    if (newReminder.title) {
      setReminders([...reminders, { 
        id: reminders.length + 1, 
        ...newReminder, 
        active: true 
      }]);
      setNewReminder({ title: '', time: '12:00', days: [] });
      setShowAddReminder(false);
    }
  };

  // Toggle reminder active status
  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  // Handle today's log changes
  const handleFlowSelect = (flow) => {
    setTodayLog({...todayLog, flow});
  };

  const handleSymptomToggle = (symptom) => {
    setTodayLog(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleMoodSelect = (mood) => {
    setTodayLog({...todayLog, mood});
  };

  const handleNotesChange = (e) => {
    setTodayLog({...todayLog, notes: e.target.value});
  };

  // Save today's log
  const saveTodayLog = () => {
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      flow: todayLog.flow,
      symptoms: todayLog.symptoms,
      mood: todayLog.mood
    };
    setLogs([newLog, ...logs]);
    setTodayLog({
      flow: '',
      symptoms: [],
      mood: '',
      notes: ''
    });
    alert('Log saved successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <Lock className="w-16 h-16 text-pink-500 mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">HerCycle</h1>
            <p className="text-gray-600 text-sm">Enter your 4-digit PIN</p>
          </div>
          
          <div className="flex justify-center mb-6">
            {[1,2,3,4].map((_, idx) => (
              <div key={idx} className="w-4 h-4 mx-2 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
                {pin.length > idx && <div className="w-3 h-3 rounded-full bg-pink-500"></div>}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1,2,3,4,5,6,7,8,9].map(digit => (
              <button
                key={digit}
                onClick={() => handlePinChange(digit.toString())}
                className="p-4 rounded-lg bg-pink-100 text-pink-800 text-xl font-medium hover:bg-pink-200 transition-colors"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() => handlePinDelete()}
              className="p-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => handlePinChange('0')}
              className="p-4 rounded-lg bg-pink-100 text-pink-800 text-xl font-medium hover:bg-pink-200 transition-colors"
            >
              0
            </button>
            <button
              onClick={handlePinSubmit}
              className="p-4 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-pink-500 text-white p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HerCycle</h1>
          <button 
            onClick={() => {setIsAuthenticated(false); setPin('');}}
            className="p-2 rounded-full hover:bg-pink-600"
          >
            <Lock size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 pb-20">
        {/* Cycle Overview Card */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Cycle Overview</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Current cycle day</p>
              <p className="text-2xl font-bold text-pink-500">{currentPeriodDay}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next period</p>
              <p className="text-md font-medium">{nextPeriod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ovulation window</p>
              <p className="text-md font-medium">{ovulationWindow}</p>
            </div>
          </div>
          
          {/* Visual Cycle Indicator */}
          <div className="mt-4 relative h-8 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              {/* Period phase */}
              <div className="h-full bg-pink-500 text-xs text-white flex items-center justify-center" style={{width: '20%'}}>
                Period
              </div>
              {/* Follicular phase */}
              <div className="h-full bg-pink-200 text-xs text-pink-800 flex items-center justify-center" style={{width: '30%'}}>
                Follicular
              </div>
              {/* Ovulation phase */}
              <div className="h-full bg-purple-300 text-xs text-purple-800 flex items-center justify-center" style={{width: '10%'}}>
                Ovulation
              </div>
              {/* Luteal phase */}
              <div className="h-full bg-blue-200 text-xs text-blue-800 flex items-center justify-center" style={{width: '40%'}}>
                Luteal
              </div>
            </div>
            {/* Current day indicator */}
            <div className="absolute top-0 h-full" style={{left: `${(currentPeriodDay / 28) * 100}%`}}>
              <div className="h-full w-1 bg-white"></div>
              <div className="h-3 w-3 rounded-full bg-white border-2 border-pink-500 absolute -top-1 -translate-x-1"></div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex justify-between bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => setActiveSection('tracker')}
            className={`flex-1 py-3 px-4 text-center ${activeSection === 'tracker' ? 'text-pink-500 border-b-2 border-pink-500 font-medium' : 'text-gray-500'}`}
          >
            <Calendar size={18} className="inline mr-1" />
            Tracker
          </button>
          <button
            onClick={() => setActiveSection('education')}
            className={`flex-1 py-3 px-4 text-center ${activeSection === 'education' ? 'text-pink-500 border-b-2 border-pink-500 font-medium' : 'text-gray-500'}`}
          >
            <BookOpen size={18} className="inline mr-1" />
            Learn
          </button>
          <button
            onClick={() => setActiveSection('myths')}
            className={`flex-1 py-3 px-4 text-center ${activeSection === 'myths' ? 'text-pink-500 border-b-2 border-pink-500 font-medium' : 'text-gray-500'}`}
          >
            <Zap size={18} className="inline mr-1" />
            Myths
          </button>
          <button
            onClick={() => setActiveSection('reminders')}
            className={`flex-1 py-3 px-4 text-center ${activeSection === 'reminders' ? 'text-pink-500 border-b-2 border-pink-500 font-medium' : 'text-gray-500'}`}
          >
            <Bell size={18} className="inline mr-1" />
            Reminders
          </button>
        </div>

        {/* Tracker Section */}
        {activeSection === 'tracker' && (
          <div className="space-y-6">
            {/* Recent logs display */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-medium text-gray-800 mb-3">Recent logs</h3>
              <div className="space-y-3">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-pink-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                      <span className="text-xs text-pink-700">{new Date(log.date).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {new Date(log.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          log.flow === 'light' ? 'bg-pink-100 text-pink-800' :
                          log.flow === 'medium' ? 'bg-pink-200 text-pink-800' :
                          'bg-pink-400 text-white'
                        }`}>
                          {log.flow} flow
                        </span>
                      </div>
                      <div className="flex flex-wrap mt-1">
                        {log.symptoms.map((symptom, i) => (
                          <span key={i} className="mr-2 text-xs text-gray-600">
                            #{symptom}
                          </span>
                        ))}
                        <span className="text-xs text-gray-600">Mood: {log.mood}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Log a new day form */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-medium text-gray-800 mb-3">Log today</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">Flow intensity</label>
                  <div className="flex space-x-2">
                    {['spotting', 'light', 'medium', 'heavy'].map(flow => (
                      <button
                        key={flow}
                        type="button"
                        onClick={() => handleFlowSelect(flow)}
                        className={`flex-1 py-2 text-center text-sm rounded-lg ${
                          todayLog.flow === flow ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800'
                        }`}
                      >
                        {flow}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">Symptoms</label>
                  <div className="flex flex-wrap gap-2">
                    {['cramps', 'headache', 'bloating', 'backache', 'fatigue'].map(symptom => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => handleSymptomToggle(symptom)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          todayLog.symptoms.includes(symptom) ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">Mood</label>
                  <div className="flex flex-wrap gap-2">
                    {['happy', 'calm', 'irritable', 'anxious', 'emotional', 'energetic'].map(mood => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => handleMoodSelect(mood)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          todayLog.mood === mood ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">Notes</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Add any additional notes..."
                    rows="2"
                    value={todayLog.notes}
                    onChange={handleNotesChange}
                  ></textarea>
                </div>
                
                <button
                  type="button"
                  onClick={saveTodayLog}
                  disabled={!todayLog.flow}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    todayLog.flow ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Education Hub Section */}
        {activeSection === 'education' && (
          <div className="space-y-6">
            {selectedArticle ? (
              <div className="bg-white rounded-xl shadow-md p-4">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center text-pink-600 mb-4"
                >
                  <ChevronLeft size={20} />
                  <span>Back to articles</span>
                </button>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {educationalContent.find(a => a.id === selectedArticle)?.title}
                </h3>
                
                <div className="prose text-gray-700">
                  <p>{educationalContent.find(a => a.id === selectedArticle)?.content}</p>
                  
                  {/* Expanded content would go here in a real app */}
                  <p className="mt-4">The menstrual cycle is controlled by hormones, primarily estrogen and progesterone. These hormones cause the lining of the uterus (endometrium) to build up in preparation for a potential pregnancy.</p>
                  
                  <p className="mt-4">If pregnancy doesn't occur, the built-up lining of the uterus is shed during menstruation. This shedding is what we experience as a period.</p>
                  
                  <h4 className="font-medium mt-6 mb-2">The Four Phases</h4>
                  
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Menstrual Phase (Days 1-5):</strong> The uterine lining sheds, resulting in menstrual bleeding.</li>
                    <li><strong>Follicular Phase (Days 1-13):</strong> Overlaps with menstruation. The pituitary gland releases follicle-stimulating hormone (FSH), which stimulates the ovaries to produce follicles.</li>
                    <li><strong>Ovulation (Day 14, approximately):</strong> A mature egg is released from the ovary and moves into the fallopian tube.</li>
                    <li><strong>Luteal Phase (Days 15-28):</strong> The follicle transforms into the corpus luteum, which produces progesterone to prepare the uterine lining for a potential fertilized egg.</li>
                  </ol>
                  
                  <div className="bg-pink-50 p-4 rounded-lg mt-6">
                    <h5 className="font-medium mb-2">Did you know?</h5>
                    <p>The length of the menstrual cycle can vary from person to person and can even change throughout your lifetime. Tracking your cycle can help you identify your personal patterns.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Education Hub</h3>
                  <p className="text-gray-600 text-sm mb-4">Learn about your body and menstrual health</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {educationalContent.map(article => (
                      <div 
                        key={article.id} 
                        className="bg-pink-50 rounded-lg p-4 cursor-pointer hover:bg-pink-100 transition-colors"
                        onClick={() => setSelectedArticle(article.id)}
                      >
                        <div className="flex items-start">
                          <div className="p-2 bg-pink-200 rounded-lg mr-3">
                            {article.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{article.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.content}</p>
                          </div>
                          <ChevronRight size={20} className="text-pink-500 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Quiz: Test Your Knowledge</h3>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="font-medium text-gray-800 mb-3">What is the average length of a menstrual cycle?</p>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-pink-100 transition-colors">A. 14 days</button>
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-pink-100 transition-colors">B. 21 days</button>
                      <button className="w-full text-left p-3 bg-pink-200 rounded-lg text-sm font-medium">C. 28 days</button>
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-pink-100 transition-colors">D. 35 days</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Correct! While 28 days is the average, cycles can range from 21-35 days and still be considered normal.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Myth Buster Section */}
        {activeSection === 'myths' && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-medium text-gray-800 mb-3">Myth Busters</h3>
            <p className="text-gray-600 text-sm mb-4">Common myths about menstruation debunked</p>
            
            <div className="space-y-4">
              {mythsAndFacts.map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="p-1 bg-pink-100 rounded-full mr-2">
                      <X size={18} className="text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.myth}</p>
                      <p className="text-sm text-gray-500 mt-1">Myth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-3 ml-8">
                    <div className="p-1 bg-green-100 rounded-full mr-2">
                      <Check size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.fact}</p>
                      <p className="text-sm text-gray-500 mt-1">Fact</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Reminders Section */}
        {activeSection === 'reminders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">My Reminders</h3>
                <button 
                  onClick={() => setShowAddReminder(!showAddReminder)}
                  className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                >
                  {showAddReminder ? <X size={20} /> : <span className="text-xl font-bold">+</span>}
                </button>
              </div>
              
              {showAddReminder && (
                <div className="bg-pink-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Add New Reminder</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Reminder title"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    />
                    
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Time</label>
                        <input
                          type="time"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={newReminder.time}
                          onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Repeat</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
                          onChange={(e) => setNewReminder({...newReminder, days: [e.target.value]})}
                        >
                          <option value="everyday">Everyday</option>
                          <option value="period days">Period days</option>
                          <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={addReminder}
                      disabled={!newReminder.title}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        newReminder.title ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Save Reminder
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div 
                    key={reminder.id} 
                    className={`flex items-center p-3 rounded-lg ${reminder.active ? 'bg-pink-50' : 'bg-gray-50'}`}
                  >
                    <div className="mr-3">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          reminder.active ? 'bg-pink-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {reminder.active && <Check size={16} />}
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-medium ${reminder.active ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                        {reminder.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Bell size={12} className="mr-1" />
                        <span>{reminder.time}</span>
                        <span className="ml-2">
                          {reminder.days.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}