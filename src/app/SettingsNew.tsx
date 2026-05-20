import { useState } from 'react';
import { User, Lock, Bell, Globe, Palette, Eye, EyeOff, LayoutDashboard, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';

export default function SettingsNew() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'preferences' | 'dashboard' | 'branding'>('profile');
  
  // Profile State
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@finsite.ai');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [title, setTitle] = useState('Senior Financial Analyst');
  const [company, setCompany] = useState('FinSite AI');
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [portfolioUpdates, setPortfolioUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  
  // Preferences State
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('America/New_York');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currency, setCurrency] = useState('USD');

  // Dashboard Customization State
  const [dashboardPanels, setDashboardPanels] = useState([
    { id: 'stories', name: 'Stories', visible: true, order: 1 },
    { id: 'upcoming', name: 'Upcoming', visible: true, order: 2 },
    { id: 'portfolio', name: 'Portfolio Exposure', visible: true, order: 3 },
    { id: 'fund', name: 'Fund Analysis', visible: true, order: 4 },
  ]);

  const togglePanelVisibility = (id: string) => {
    setDashboardPanels(panels =>
      panels.map(panel =>
        panel.id === id ? { ...panel, visible: !panel.visible } : panel
      )
    );
  };

  const movePanelUp = (id: string) => {
    const index = dashboardPanels.findIndex(p => p.id === id);
    if (index > 0) {
      const newPanels = [...dashboardPanels];
      [newPanels[index - 1], newPanels[index]] = [newPanels[index], newPanels[index - 1]];
      // Update order numbers
      newPanels.forEach((panel, idx) => panel.order = idx + 1);
      setDashboardPanels(newPanels);
    }
  };

  const movePanelDown = (id: string) => {
    const index = dashboardPanels.findIndex(p => p.id === id);
    if (index < dashboardPanels.length - 1) {
      const newPanels = [...dashboardPanels];
      [newPanels[index], newPanels[index + 1]] = [newPanels[index + 1], newPanels[index]];
      // Update order numbers
      newPanels.forEach((panel, idx) => panel.order = idx + 1);
      setDashboardPanels(newPanels);
    }
  };

  const resetDashboard = () => {
    setDashboardPanels([
      { id: 'stories', name: 'Stories', visible: true, order: 1 },
      { id: 'upcoming', name: 'Upcoming', visible: true, order: 2 },
      { id: 'portfolio', name: 'Portfolio Exposure', visible: true, order: 3 },
      { id: 'fund', name: 'Fund Analysis', visible: true, order: 4 },
    ]);
  };

  const handleSaveProfile = () => {
    // Handle profile save
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Handle password change
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-[#0B1220] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-[#1F2937]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'profile'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <User className="w-4 h-4 inline-block mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'password'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <Lock className="w-4 h-4 inline-block mr-2" />
            Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'notifications'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <Bell className="w-4 h-4 inline-block mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'preferences'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <Globe className="w-4 h-4 inline-block mr-2" />
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 inline-block mr-2" />
            Layout
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              activeTab === 'branding'
                ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <Palette className="w-4 h-4 inline-block mr-2" />
            White Label
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
            
            {/* Profile Picture */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="bg-[#3B82F6] rounded-full w-20 h-20 flex items-center justify-center font-bold text-2xl text-white">
                  {firstName[0]}{lastName[0]}
                </div>
                <div>
                  <Button className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-sm px-4 py-2 rounded-lg mb-2">
                    Upload Photo
                  </Button>
                  <p className="text-xs text-[#6B7280]">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveProfile}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-8 py-3 rounded-lg"
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
            <p className="text-[#9CA3AF] mb-8">
              Ensure your account is using a long, random password to stay secure.
            </p>

            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF]"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF]"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">Must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleChangePassword}
                  className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-8 py-3 rounded-lg"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
            <p className="text-[#9CA3AF] mb-8">
              Manage how you receive notifications and updates.
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-[#1F2937]">
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Notifications</h3>
                  <p className="text-sm text-[#6B7280]">Receive email updates about your account activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1F2937] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#1F2937]">
                <div>
                  <h3 className="text-white font-semibold mb-1">Market Alerts</h3>
                  <p className="text-sm text-[#6B7280]">Get notified about significant market movements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketAlerts}
                    onChange={(e) => setMarketAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1F2937] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#1F2937]">
                <div>
                  <h3 className="text-white font-semibold mb-1">Portfolio Updates</h3>
                  <p className="text-sm text-[#6B7280]">Receive updates about your portfolio performance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={portfolioUpdates}
                    onChange={(e) => setPortfolioUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1F2937] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">Weekly Digest</h3>
                  <p className="text-sm text-[#6B7280]">Get a weekly summary of market insights and analysis</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1F2937] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Application Preferences</h2>
            <p className="text-[#9CA3AF] mb-8">
              Customize your application experience.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                  <option>CAD</option>
                  <option>AUD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Customization</h2>
            <p className="text-[#9CA3AF] mb-8">
              Arrange and customize your dashboard layout.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Layout</label>
                <select
                  className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                >
                  <option>Default Layout</option>
                  <option>Compact Layout</option>
                  <option>Full Width Layout</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Widgets</label>
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-[#6B7280]" />
                  <p className="text-sm text-[#6B7280]">Drag and drop to rearrange widgets</p>
                </div>
              </div>
            </div>

            {/* Dashboard Panels */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-[#9CA3AF] mb-4">Dashboard Panels</h3>
              <div className="space-y-4">
                {dashboardPanels.map(panel => (
                  <div key={panel.id} className="flex items-center justify-between bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={panel.visible}
                        onChange={() => togglePanelVisibility(panel.id)}
                        className="mr-3"
                      />
                      <span className="text-white font-semibold">{panel.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => movePanelUp(panel.id)}
                        className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white px-3 py-2 rounded-lg"
                        disabled={panel.order === 1}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => movePanelDown(panel.id)}
                        className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white px-3 py-2 rounded-lg"
                        disabled={panel.order === dashboardPanels.length}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={resetDashboard}
                  className="bg-transparent border border-[#1F2937] hover:bg-[#1F2937] text-white px-6 py-3 rounded-lg"
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* White Label / Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <WhiteLabelBranding />
          </div>
        )}
      </div>
    </div>
  );
}

// White Label Branding Component
function WhiteLabelBranding() {
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [headerBgColor, setHeaderBgColor] = useState('#111827');
  const [footerBgColor, setFooterBgColor] = useState('#111827');
  const [headerTextColor, setHeaderTextColor] = useState('#FFFFFF');
  const [footerTextColor, setFooterTextColor] = useState('#9CA3AF');
  const [companyName, setCompanyName] = useState('FinSite AI');
  const [footerText, setFooterText] = useState('© 2025 FinSite AI. All rights reserved.');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Logo Customization */}
      <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Logo Configuration</h2>
        <p className="text-[#9CA3AF] mb-6">
          Upload your company logo to replace the FinSite branding across the platform.
        </p>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Company Logo</label>
            <div className="bg-[#0B1220] border-2 border-dashed border-[#1F2937] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              {logoFile ? (
                <div className="flex flex-col items-center">
                  <img src={logoFile} alt="Company Logo" className="max-h-32 mb-4" />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Change Logo
                    </div>
                  </label>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-[#1F2937] rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-8 h-8 text-[#6B7280]" />
                  </div>
                  <p className="text-[#9CA3AF] mb-2">No logo uploaded</p>
                  <p className="text-[#6B7280] text-sm mb-4">PNG or SVG recommended</p>
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Upload Logo
                    </div>
                  </label>
                </>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 mb-4"
            />
            
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3 mt-6">Logo Placement</label>
            <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20">
              <option>Top Left (Default)</option>
              <option>Top Center</option>
              <option>Top Right</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Color Scheme</h2>
        <p className="text-[#9CA3AF] mb-6">
          Customize the color palette to match your brand identity.
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
            <p className="text-xs text-[#6B7280] mt-2">Used for buttons, links, and accents</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Secondary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
            <p className="text-xs text-[#6B7280] mt-2">Used for secondary actions and highlights</p>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 p-6 bg-[#0B1220] rounded-lg border border-[#1F2937]">
          <h3 className="text-sm font-semibold text-[#9CA3AF] mb-4">Color Preview</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <button
                style={{ backgroundColor: primaryColor }}
                className="w-full py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              >
                Primary Button
              </button>
            </div>
            <div className="flex-1">
              <button
                style={{ backgroundColor: secondaryColor }}
                className="w-full py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header Customization */}
      <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Header Customization</h2>
        <p className="text-[#9CA3AF] mb-6">
          Customize the appearance of your application header.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Header Background Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={headerBgColor}
                onChange={(e) => setHeaderBgColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={headerBgColor}
                onChange={(e) => setHeaderBgColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Header Text Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={headerTextColor}
                onChange={(e) => setHeaderTextColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={headerTextColor}
                onChange={(e) => setHeaderTextColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>
        </div>

        {/* Header Preview */}
        <div className="p-4 rounded-lg border border-[#1F2937]" style={{ backgroundColor: headerBgColor }}>
          <h3 className="text-sm font-semibold text-[#9CA3AF] mb-3">Header Preview</h3>
          <div className="flex items-center justify-between">
            <span style={{ color: headerTextColor }} className="font-bold text-lg">{companyName}</span>
            <div className="flex gap-3">
              <span style={{ color: headerTextColor }} className="text-sm">Dashboard</span>
              <span style={{ color: headerTextColor }} className="text-sm">Markets</span>
              <span style={{ color: headerTextColor }} className="text-sm">Portfolio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Customization */}
      <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Footer Customization</h2>
        <p className="text-[#9CA3AF] mb-6">
          Customize the appearance of your application footer.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Footer Background Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={footerBgColor}
                onChange={(e) => setFooterBgColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={footerBgColor}
                onChange={(e) => setFooterBgColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Footer Text Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={footerTextColor}
                onChange={(e) => setFooterTextColor(e.target.value)}
                className="w-16 h-12 rounded-lg border border-[#1F2937] cursor-pointer"
              />
              <input
                type="text"
                value={footerTextColor}
                onChange={(e) => setFooterTextColor(e.target.value)}
                className="flex-1 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Footer Text</label>
          <input
            type="text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
          />
        </div>

        {/* Footer Preview */}
        <div className="p-4 rounded-lg border border-[#1F2937]" style={{ backgroundColor: footerBgColor }}>
          <h3 className="text-sm font-semibold text-[#9CA3AF] mb-3">Footer Preview</h3>
          <div className="text-center">
            <p style={{ color: footerTextColor }} className="text-sm">{footerText}</p>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold mb-1">Apply White Label Changes</h3>
            <p className="text-sm text-[#6B7280]">Changes will be applied across all user-facing pages</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-transparent border border-[#1F2937] hover:bg-[#1F2937] text-white px-6 py-3 rounded-lg">
              Reset to Default
            </Button>
            <Button className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-8 py-3 rounded-lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}