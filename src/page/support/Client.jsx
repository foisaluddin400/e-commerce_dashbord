import React from 'react'

const Client = () => {
      const data = [
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Client", time: "10:00 AM, Today" },
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Vendor", time: "10:00 AM, Today" },
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Client", time: "10:00 AM, Today" },
  ];

  return (
    <div>
        <div className="space-y-3">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-red-100 px-4 py-3 rounded"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}{" "}
                    <span className="border border-red-400 text-red-500 text-xs px-2 py-0.5 rounded ml-2">
                      {item.type}
                    </span>
                  </h3>
                  <p className="text-sm text-red-500">{item.email}</p>
                  <p className="text-gray-500 text-sm">
                    A new support request has been submitted by a {item.type}
                  </p>
                </div>
                <div className="text-gray-700 font-medium">{item.time}</div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Client