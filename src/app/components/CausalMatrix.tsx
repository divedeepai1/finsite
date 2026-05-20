interface CausalMatrixProps {
  title: string;
  data: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  isExpanded?: boolean;
}

export function CausalMatrix({ title, data, isExpanded = false }: CausalMatrixProps) {
  const cellHeight = isExpanded ? 'max-h-32' : 'max-h-24';
  const cellMinHeight = isExpanded ? 'min-h-32' : 'min-h-24';
  
  return (
    <div className="bg-[#162033] rounded-lg border border-gray-700 p-4">
      <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
        {title}
      </h3>
      
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-32"></th>
              <th className="border border-gray-700 bg-[#F59E0B]/10 p-2">
                <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  MATERIAL
                </div>
                <div className="text-[10px] text-gray-400 mt-1">What it's made of</div>
              </th>
              <th className="border border-gray-700 bg-[#22C55E]/10 p-2">
                <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  FORMAL
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Its structure/form</div>
              </th>
              <th className="border border-gray-700 bg-[#3B82F6]/10 p-2">
                <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  EFFICIENT
                </div>
                <div className="text-[10px] text-gray-400 mt-1">What makes it happen</div>
              </th>
              <th className="border border-gray-700 bg-[#8B5CF6]/10 p-2">
                <div className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  FINAL
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Its purpose/goal</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 bg-[#3B82F6]/10 p-2">
                <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  OBJECT
                </div>
                <div className="text-[10px] text-gray-400 mt-1">The thing/product</div>
              </td>
              {['material', 'formal', 'efficient', 'final'].map((col) => (
                <td key={col} className="border border-gray-700 p-0 align-top">
                  <div className="p-2">
                    <ul className="text-xs text-gray-300 space-y-1">
                      {data.object[col].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#3B82F6] mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-700 bg-[#3B82F6]/10 p-2">
                <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  RELATIVE
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Comparative</div>
              </td>
              {['material', 'formal', 'efficient', 'final'].map((col) => (
                <td key={col} className="border border-gray-700 p-0 align-top">
                  <div className="p-2">
                    <ul className="text-xs text-gray-300 space-y-1">
                      {data.relative[col].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#3B82F6] mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-700 bg-[#F59E0B]/10 p-2">
                <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  NEGATIVE
                </div>
                <div className="text-[10px] text-gray-400 mt-1">The obstacles/against</div>
              </td>
              {['material', 'formal', 'efficient', 'final'].map((col) => (
                <td key={col} className="border border-gray-700 p-0 align-top">
                  <div className="p-2">
                    <ul className="text-xs text-gray-300 space-y-1">
                      {data.negative[col].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#EF4444] mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-700 bg-[#F59E0B]/10 p-2">
                <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  ENVIRONMENT
                </div>
                <div className="text-[10px] text-gray-400 mt-1">The system/context</div>
              </td>
              {['material', 'formal', 'efficient', 'final'].map((col) => (
                <td key={col} className="border border-gray-700 p-0 align-top">
                  <div className="p-2">
                    <ul className="text-xs text-gray-300 space-y-1">
                      {data.environment[col].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#F59E0B] mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}