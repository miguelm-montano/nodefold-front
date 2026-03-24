function FeatureWhatIsNotion({ icon, title, description }) {
  return (
    <div className="flex items-center gap-6 p-8 bg-neutral-50 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-black">{title}</h3>
        <p className="text-sm text-gray-500 dark:black">{description}</p>
      </div>
    </div>
  );
}

export default FeatureWhatIsNotion;
