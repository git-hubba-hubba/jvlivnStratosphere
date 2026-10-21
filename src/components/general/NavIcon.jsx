const paths = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></>,
  process: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h6a3 3 0 0 1 3 3v6M15 12l3 3 3-3M6 9v9h5m-3-3 3 3-3 3" /></>,
  learn: <><path d="m2 9 10-5 10 5-10 5Zm4 2v6c4 3 8 3 12 0v-6M22 9v8" /></>,
  services: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a23 23 0 0 0 18 0M12 12v4" /></>,
  resources: <><path d="M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z" /></>,
  insights: <><path d="M9 18v-2c0-2-4-3-4-7a7 7 0 1 1 14 0c0 4-4 5-4 7v2ZM9 21h6M9 18h6M12 15v-5m-2-1 2 1 2-1" /></>,
  profile: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
};

export default function NavIcon({ name, className = "navImg" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
