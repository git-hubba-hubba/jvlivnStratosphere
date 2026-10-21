// Organizer destinations, rather than a dated list presented as upcoming events.
export const eventSources=[
  {id:'aws',eventName:'AWS re:Invent',category:'Cloud & infrastructure',format:'Conference',evtDesc:'Explore cloud engineering, architecture, security, and hands-on learning from the AWS community.',evtUrl:'https://reinvent.awsevents.com',mark:'AWS'},
  {id:'google',eventName:'Google I/O',category:'Software development',format:'Developer event',evtDesc:'Find developer sessions and announcements across Google’s platforms and tools.',evtUrl:'https://io.google',mark:'I/O'},
  {id:'nvidia',eventName:'NVIDIA GTC',category:'AI & automation',format:'Conference',evtDesc:'Explore AI, accelerated computing, research, and developer learning opportunities.',evtUrl:'https://www.nvidia.com/gtc/',mark:'AI'},
  {id:'apple',eventName:'Apple WWDC',category:'Software development',format:'Developer event',evtDesc:'Discover sessions, labs, and resources for building across Apple platforms.',evtUrl:'https://developer.apple.com/wwdc/',mark:'</>'},
  {id:'websummit',eventName:'Web Summit',category:'Startups & networking',format:'Conference',evtDesc:'Explore a meeting place for technology companies, founders, investors, and new ideas.',evtUrl:'https://websummit.com/',mark:'WS'},
  {id:'ghc',eventName:'Grace Hopper Celebration',category:'Careers & community',format:'Community event',evtDesc:'Discover a community centered on women in technology, professional growth, and technical learning.',evtUrl:'https://ghc.anitab.org/',mark:'GH'},
  {id:'techmeetups',eventName:'TechMeetups',category:'Careers & community',format:'Career events',evtDesc:'Browse organizer listings for technology job fairs and professional connections.',evtUrl:'https://techmeetups.com/product-category/other/tech-job-fair/',mark:'TM'},
  {id:'hackerx',eventName:'HackerX',category:'Careers & community',format:'Hiring events',evtDesc:'Explore developer hiring and networking events, including organizer eligibility and application details.',evtUrl:'https://hackerx.org/',mark:'HX'},
];
export function safeEventUrl(value){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
