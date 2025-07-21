const TriggerCalls = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Trigger Calls</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Contact List</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>All Contacts</option>
              <option>VIP Customers</option>
              <option>New Leads</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Audio File</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Welcome Message</option>
              <option>Promotional Offer</option>
              <option>Survey</option>
            </select>
          </div>
        </div>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
          Start Calling Campaign
        </button>
      </div>
    </div>
  );
};

export default TriggerCalls;