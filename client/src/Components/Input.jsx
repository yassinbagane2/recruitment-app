/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example({type, name, placeholder, label, onChange}) {
    return (
      <div>
        <label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            onChange={onChange}
            type={type}
            name={name}
            id={name}
            className="px-3 py-2 mb-4 shadow-sm block w-full sm:text-sm border border-slate-500 outline-none rounded-md"
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  }
  