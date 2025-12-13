import { useState, useEffect, useCallback } from 'react'

const PREFERENCES_KEY = 'financetrack_preferences'

export interface Preferences {
    currency: string
    dateFormat: string
    notifications: boolean
    emailAlerts: boolean
    budgetAlerts: boolean
}

const defaultPreferences: Preferences = {
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    notifications: true,
    emailAlerts: true,
    budgetAlerts: true,
}

const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥',
}

const currencyLocales: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    INR: 'en-IN',
    JPY: 'ja-JP',
}

export function usePreferences() {
    const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)

    // Load preferences from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(PREFERENCES_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setPreferences(prev => ({ ...prev, ...parsed }))
            } catch (e) {
                console.error('Failed to parse preferences:', e)
            }
        }
    }, [])

    // Save preferences to localStorage
    const savePreferences = useCallback((newPreferences: Partial<Preferences>) => {
        const updated = { ...preferences, ...newPreferences }
        setPreferences(updated)
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated))
    }, [preferences])

    // Format currency based on user preference
    const formatCurrency = useCallback((amount: number) => {
        const locale = currencyLocales[preferences.currency] || 'en-US'
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: preferences.currency,
        }).format(amount)
    }, [preferences.currency])

    // Get currency symbol
    const getCurrencySymbol = useCallback(() => {
        return currencySymbols[preferences.currency] || '$'
    }, [preferences.currency])

    return {
        preferences,
        setPreferences,
        savePreferences,
        formatCurrency,
        getCurrencySymbol,
    }
}
