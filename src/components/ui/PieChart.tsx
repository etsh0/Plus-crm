import { 
    Pie, Cell, PieChart as RechartsPieChart,
    ResponsiveContainer, Tooltip 
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const PieChart = ({data}: {data: any[]}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full animate-pulse bg-gray-100 dark:bg-white/5 rounded-xl" />;

  const isDark = resolvedTheme === "dark";
  const tooltipBg = isDark ? "#1a1a2e" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = isDark ? "#fff" : "#111";

  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: tooltipText }}
            />
            </RechartsPieChart>
        </ResponsiveContainer>
    </>
  )
}
