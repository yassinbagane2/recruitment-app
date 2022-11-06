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
export default function Example({onChange, name}) {
    return (
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          About You
        </label>
        <div className="mt-1">
          <textarea
            rows={4}
            name={name || 'textArea'}
            id="comment"
            onChange={onChange}
            className="shadow-sm border block w-full sm:text-sm p-2 border-gray-300 rounded-md"
            defaultValue={''}
            placeholder='Why Should We Hire You ?'
          />
        </div>
      </div>
    )
  }
  