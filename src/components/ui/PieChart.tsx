import { 
    Pie, Cell, PieChart as RechartsPieChart,
    ResponsiveContainer, Tooltip 
} from "recharts";

export const PieChart = ({data}: {data: any[]}) => {
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
                contentStyle={{ backgroundColor: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
            />
            </RechartsPieChart>
        </ResponsiveContainer>
    </>
  )
}
