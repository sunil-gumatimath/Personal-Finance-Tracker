import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePreferences } from '@/hooks/usePreferences'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface MonthlyTrend {
    month: string
    income: number
    expenses: number
}

interface SpendingChartProps {
    data: MonthlyTrend[]
}

export function SpendingChart({ data }: SpendingChartProps) {
    const { formatCurrency } = usePreferences()

    // Calculate totals for summary
    const totalIncome = data.reduce((sum, item) => sum + item.income, 0)
    const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0)
    const netFlow = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? ((netFlow / totalIncome) * 100).toFixed(0) : '0'

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean
        payload?: Array<{ value: number; dataKey: string; color: string }>
        label?: string
    }) => {
        if (!active || !payload) return null

        const income = payload.find(p => p.dataKey === 'income')?.value || 0
        const expenses = payload.find(p => p.dataKey === 'expenses')?.value || 0
        const net = income - expenses

        return (
            <div className="rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl px-4 py-3 shadow-2xl min-w-[180px]">
                <p className="font-bold text-foreground text-base mb-3 pb-2 border-b border-border/50">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 py-1">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full shadow-lg"
                                style={{
                                    backgroundColor: entry.color,
                                    boxShadow: `0 0 8px ${entry.color}60`
                                }}
                            />
                            <span className="text-sm text-muted-foreground">
                                {entry.dataKey === 'income' ? 'Income' : 'Expenses'}
                            </span>
                        </div>
                        <span className={`font-semibold text-sm ${entry.dataKey === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {formatCurrency(entry.value)}
                        </span>
                    </div>
                ))}
                <div className="flex items-center justify-between gap-4 pt-2 mt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Net</span>
                    <span className={`font-bold text-sm ${net >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {net >= 0 ? '+' : ''}{formatCurrency(net)}
                    </span>
                </div>
            </div>
        )
    }

    // Custom legend with enhanced styling
    const CustomLegend = () => (
        <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2.5 group cursor-default">
                <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 group-hover:scale-125 transition-transform" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-20" />
                </div>
                <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Income</span>
            </div>
            <div className="flex items-center gap-2.5 group cursor-default">
                <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/40 group-hover:scale-125 transition-transform" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-rose-500 animate-ping opacity-20" />
                </div>
                <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Expenses</span>
            </div>
        </div>
    )

    return (
        <Card className="relative border border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm shadow-xl overflow-hidden h-full">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-rose-500/[0.02]" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

            <CardHeader className="relative pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/10">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                Income vs Expenses
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Last 6 months financial flow
                            </p>
                        </div>
                    </div>

                    {/* Stats badges */}
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${netFlow >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {netFlow >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-bold text-sm">{formatCurrency(Math.abs(netFlow))}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                            <span className="text-xs font-medium">Savings</span>
                            <span className="font-bold text-sm">{savingsRate}%</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative pt-2">
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                        >
                            <defs>
                                {/* Income gradient - more vibrant */}
                                <linearGradient id="incomeGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                                    <stop offset="40%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                {/* Expenses gradient - more vibrant */}
                                <linearGradient id="expenseGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
                                    <stop offset="40%" stopColor="#f43f5e" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                                </linearGradient>

                                {/* Enhanced glow filters */}
                                <filter id="incomeGlowEnhanced" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feFlood floodColor="#10b981" floodOpacity="0.4" />
                                    <feComposite in2="blur" operator="in" />
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="expenseGlowEnhanced" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feFlood floodColor="#f43f5e" floodOpacity="0.4" />
                                    <feComposite in2="blur" operator="in" />
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                {/* Drop shadow for lines */}
                                <filter id="lineShadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                                </filter>
                            </defs>

                            {/* Grid with enhanced styling */}
                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="hsl(var(--border))"
                                strokeOpacity={0.4}
                                vertical={false}
                            />

                            {/* Axes with enhanced styling */}
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: 'hsl(var(--muted-foreground))',
                                    fontSize: 12,
                                    fontWeight: 600
                                }}
                                dy={12}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: 'hsl(var(--muted-foreground))',
                                    fontSize: 11,
                                    fontWeight: 500
                                }}
                                tickFormatter={(value) => {
                                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
                                    return value.toString()
                                }}
                                width={50}
                            />

                            {/* Enhanced Tooltip */}
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }} />

                            {/* Income Area - Enhanced */}
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#10b981"
                                strokeWidth={3}
                                fill="url(#incomeGradientEnhanced)"
                                style={{ filter: 'url(#lineShadow)' }}
                                dot={{
                                    fill: '#10b981',
                                    stroke: '#ffffff',
                                    strokeWidth: 2.5,
                                    r: 5,
                                    filter: 'url(#incomeGlowEnhanced)'
                                }}
                                activeDot={{
                                    fill: '#10b981',
                                    stroke: '#ffffff',
                                    strokeWidth: 3,
                                    r: 8,
                                    filter: 'url(#incomeGlowEnhanced)',
                                    className: 'animate-pulse'
                                }}
                            />

                            {/* Expenses Area - Enhanced */}
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                stroke="#f43f5e"
                                strokeWidth={2.5}
                                fill="url(#expenseGradientEnhanced)"
                                style={{ filter: 'url(#lineShadow)' }}
                                dot={{
                                    fill: '#f43f5e',
                                    stroke: '#ffffff',
                                    strokeWidth: 2,
                                    r: 4,
                                    filter: 'url(#expenseGlowEnhanced)'
                                }}
                                activeDot={{
                                    fill: '#f43f5e',
                                    stroke: '#ffffff',
                                    strokeWidth: 3,
                                    r: 7,
                                    filter: 'url(#expenseGlowEnhanced)',
                                    className: 'animate-pulse'
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Enhanced Custom Legend */}
                <CustomLegend />
            </CardContent>
        </Card>
    )
}
