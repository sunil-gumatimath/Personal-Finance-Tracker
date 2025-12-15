import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePreferences } from '@/hooks/usePreferences'
import type { SpendingByCategory } from '@/types'
import { TrendingDown, Sparkles } from 'lucide-react'

interface BudgetOverviewProps {
    spendingByCategory: SpendingByCategory[]
}

const COLORS = [
    '#f43f5e', // rose
    '#10b981', // emerald
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#84cc16', // lime
]

export function BudgetOverview({ spendingByCategory }: BudgetOverviewProps) {
    const { formatCurrency } = usePreferences()

    // Calculate total spending
    const totalSpending = spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0)

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: {
        active?: boolean
        payload?: Array<{ payload: SpendingByCategory }>
    }) => {
        if (!active || !payload || !payload[0]) return null
        const data = payload[0].payload

        return (
            <div className="rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: data.color || COLORS[0] }}
                    />
                    <span className="font-medium text-sm">{data.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(data.amount)} ({data.percentage.toFixed(1)}%)
                </p>
            </div>
        )
    }

    if (spendingByCategory.length === 0) {
        return (
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg h-full">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                            <TrendingDown className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
                            <p className="text-xs text-muted-foreground">Where your money goes</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="p-4 rounded-2xl bg-muted/20 mb-3">
                        <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        No spending data yet
                    </p>
                    <p className="text-xs text-muted-foreground/70 text-center mt-1">
                        Add expenses to see your breakdown
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg h-full flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                            <TrendingDown className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
                            <p className="text-xs text-muted-foreground">Where your money goes</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-2">
                {/* Donut Chart with Center Total */}
                <div className="relative h-[160px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                {spendingByCategory.map((entry, index) => (
                                    <filter key={`glow-${index}`} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                        <feFlood floodColor={entry.color || COLORS[index % COLORS.length]} floodOpacity="0.3" />
                                        <feComposite in2="blur" operator="in" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                ))}
                            </defs>
                            <Pie
                                data={spendingByCategory}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={45}
                                strokeWidth={0}
                                paddingAngle={3}
                            >
                                {spendingByCategory.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color || COLORS[index % COLORS.length]}
                                        className="transition-all duration-300 hover:opacity-80"
                                        style={{ filter: `url(#glow-${index})` }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Total */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-lg font-bold text-foreground">{formatCurrency(totalSpending)}</p>
                    </div>
                </div>

                {/* Category List */}
                <div className="space-y-2 flex-1 overflow-auto">
                    {spendingByCategory.slice(0, 5).map((category, index) => {
                        const color = category.color || COLORS[index % COLORS.length]
                        return (
                            <div
                                key={category.category}
                                className="group flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-all duration-200 cursor-default"
                            >
                                {/* Color indicator with glow */}
                                <div
                                    className="w-3 h-3 rounded-full shrink-0 shadow-lg"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: `0 0 8px ${color}40`
                                    }}
                                />

                                {/* Category name */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{category.category}</p>
                                </div>

                                {/* Amount and percentage */}
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-semibold">{formatCurrency(category.amount)}</p>
                                    <p className="text-xs text-muted-foreground">{category.percentage.toFixed(0)}%</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* More categories indicator */}
                {spendingByCategory.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center mt-2 pt-2 border-t border-border/50">
                        +{spendingByCategory.length - 5} more categories
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
