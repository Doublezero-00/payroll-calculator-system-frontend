export default function Unauthorized() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200 animate-fadeIn">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-md">
            <span className="text-red-600 text-5xl font-bold">!</span>
          </div>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold text-red-600 tracking-wide">
          403
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Unauthorized Access
        </h2>

        <p className="text-gray-600 mt-3 text-lg">
          You do not have permission to view this page.
        </p>

        <div className="mt-8">
          <a
            href="/"
            className="
              px-6 py-3 rounded-xl bg-red-600 text-white font-medium 
              hover:bg-red-700 transition-all duration-300 shadow-md
            "
          >
            Go Back Home
          </a>
        </div>

      </div>
    </div>
  );
}
