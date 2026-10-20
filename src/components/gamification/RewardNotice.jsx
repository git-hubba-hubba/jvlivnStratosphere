import {useEffect} from 'react';
import {useRewards,dismissNotice} from './store';
export default function RewardNotice(){const {notice}=useRewards();useEffect(()=>{if(!notice)return;const timeout=setTimeout(dismissNotice,6500);return()=>clearTimeout(timeout);},[notice]);return notice?<div className="gm-toast" role="status"><span>{notice.text}</span><button onClick={dismissNotice} aria-label="Dismiss reward notification">×</button></div>:null;}
