import {useId} from 'react';

export default function FrozenLogo(){
  const id=useId().replaceAll(':','');
  return <svg className="gifMe frozen-logo" viewBox="200 80 624 824" width="624" height="824" aria-hidden="true" focusable="false">
    <defs>
      <filter id={`${id}-silhouette`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 0 0 0 1"/></filter>
      <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style={{maskType:'alpha'}}><image href="/images/main-logo.png" width="1024" height="1024" filter={`url(#${id}-silhouette)`}/></mask>
      <linearGradient id={`${id}-ice`} x1="280" y1="160" x2="690" y2="840" gradientUnits="userSpaceOnUse"><stop stopColor="#e6faff"/><stop offset=".2" stopColor="#67bce8"/><stop offset=".4" stopColor="#acdff9"/><stop offset=".58" stopColor="#3b8fc6"/><stop offset=".76" stopColor="#b8e9ff"/><stop offset="1" stopColor="#3777ae"/></linearGradient>
      <linearGradient id={`${id}-shine`} x1="250" y1="230" x2="710" y2="730" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity=".8"/><stop offset=".3" stopColor="white" stopOpacity="0"/><stop offset=".52" stopColor="white" stopOpacity=".6"/><stop offset=".58" stopColor="white" stopOpacity="0"/><stop offset="1" stopColor="#d5f4ff" stopOpacity=".5"/></linearGradient>
      <filter id={`${id}-rime`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".1" numOctaves="3" seed="12"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .4 0"/></filter>
      <filter id={`${id}-glow`} x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#8dd7ff" floodOpacity=".55"/><feDropShadow dx="-1" dy="-2" stdDeviation="1" floodColor="white" floodOpacity=".95"/><feDropShadow dx="1" dy="3" stdDeviation="1" floodColor="#538dbb" floodOpacity=".5"/></filter>
    </defs>
    <g filter={`url(#${id}-glow)`}><g mask={`url(#${id}-mask)`}>
      <path fill={`url(#${id}-ice)`} d="M0 0h1024v1024H0z"/>
      <path fill={`url(#${id}-shine)`} d="M0 0h1024v1024H0z"/>
      <path fill="white" filter={`url(#${id}-rime)`} opacity=".7" d="M0 0h1024v1024H0z"/>
      <g fill="none" stroke="#e7faff" strokeWidth="3" strokeLinecap="round" opacity=".75"><path d="m511 118-12 94 38 79-24 86 48 67-18 103 55 83-12 103 32 77M245 350l99 26 48 88 96 27 55 56m-199-171 37-75 66-23m-55 186-34 81-70 32m273-133 73-47 80 27 74-47m-227 200-76 38-23 105-68 41m199-101 58 12 68-26"/><path strokeWidth="1.5" d="m499 212-39 31-9 48m62 86-52-16-19-45m-50 148 35-34 21 2m95 115 21-54 48-9m-164 111 41 22 13 39m159-230 14 46 42 18"/></g>
      <path d="m285 322 38 8-21 88Zm326-57 52 24-40 87ZM461 702l25-38 17 92Z" fill="#effcff" opacity=".35"/>
    </g></g>
  </svg>;
}
