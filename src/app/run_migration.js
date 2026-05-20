const fs = require('fs');
const dashboardPath = '../src/app/Dashboard.tsx';
const fundPath = '../src/app/components/FundTabContent.tsx';

let dCode = fs.readFileSync(dashboardPath, 'utf8');
let fCode = fs.readFileSync(fundPath, 'utf8');

// The user is asking:
// "From the dashboard move Fund analysis and portfolio exposure to the page Fund which is location in the AI Inishgts module.Show both fund analysis and portfolio at the end of the Fund page."

// Let's re-extract since our previous attempt was reverted.

function extractByLineNumber(code, startLine, endLine) {
  const lines = code.split('\n');
  return lines.slice(startLine - 1, endLine).join('\n');
}

// Data to move from Dashboard
const statesToMove = extractByLineNumber(dCode, 42, 46) + '\n' + extractByLineNumber(dCode, 56, 57);
const treemapData = extractByLineNumber(dCode, 292, 321);
const commentaryData = extractByLineNumber(dCode, 323, 377);

const portfolioExposureJSX = extractByLineNumber(dCode, 491, 670);
const fundAnalysisJSX = extractByLineNumber(dCode, 735, 1140);

const customTreemapComp = extractByLineNumber(dCode, 1173, 1297);
const customTreemapContentComp = extractByLineNumber(dCode, 1299, 1431);

// Remove from Dashboard
let dLines = dCode.split('\n');
const blankOut = (start, end) => {
  for(let i=start-1; i<end; i++) dLines[i] = '/* removed */';
}
blankOut(42, 46);
blankOut(56, 57);
blankOut(292, 321);
blankOut(323, 377);
blankOut(491, 670);
blankOut(735, 1140);
blankOut(1173, 1297);
blankOut(1299, 1431);

dLines = dLines.filter(l => l !== '/* removed */');
fs.writeFileSync(dashboardPath, dLines.join('\n'));

// Add to FundTabContent
let fLines = fCode.split('\n');

const stateInjectIndex = fLines.findIndex(l => l.includes('// Blend State'));
fLines.splice(stateInjectIndex, 0, statesToMove, treemapData, commentaryData);

const isMountedState = `
  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
`;
fLines.splice(stateInjectIndex, 0, isMountedState);

// Now for JSX. In FundTabContent, we want to place it at the very end of the page content.
// The main page content ends around here:
/*
                <div>
                  <div className="text-[10px] text-blue-400 font-bold uppercase mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Likely Objections</div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
*/

let sectionClosingIndex = fLines.length - 1;
while(sectionClosingIndex > 0 && !fLines[sectionClosingIndex].includes('</section>')) {
  sectionClosingIndex--;
}

fLines.splice(sectionClosingIndex + 1, 0, '<div className="px-6 py-8">', portfolioExposureJSX, fundAnalysisJSX, '</div>');

fLines.push('', customTreemapComp, customTreemapContentComp);

// Add missing imports
// From lucide-react: Briefcase, Sparkles, TrendingUp
// From recharts: PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
// Select from ui/select
const importsToAdd = `
import { PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
`;
fLines.splice(10, 0, importsToAdd);

fs.writeFileSync(fundPath, fLines.join('\n'));
console.log("Migration complete.");
