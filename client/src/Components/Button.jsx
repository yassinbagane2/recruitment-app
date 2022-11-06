/* This example requires Tailwind CSS v2.0+ */
export default function Example({text, handleClick, type}) {
    return (
      <>
        <button
          onClick={handleClick}
          type={type || "button"}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text || 'Submit Form'}
        </button>
        
      </>
    )
  }
  