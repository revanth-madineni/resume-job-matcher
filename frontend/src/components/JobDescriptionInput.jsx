export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
        Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        placeholder="Paste the full job description here — include responsibilities, requirements, and preferred qualifications..."
        className="w-full resize-none rounded-2xl border border-gray-300 bg-white p-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-600 dark:focus:ring-violet-800"
      />
      <p className="text-right text-xs text-gray-400">{value.length} characters</p>
    </div>
  );
}
