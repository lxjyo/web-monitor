import BehaviorMonitor from "./BehaviorMonitor";

import domReplacer from './domReplacer';
import historyReplacer from "./historyReplacer";

const behaviorMonitor = new BehaviorMonitor();

const report = behaviorMonitor.push.bind(behaviorMonitor)

domReplacer(report);

historyReplacer(report);

