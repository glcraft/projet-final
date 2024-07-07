export function formatPrixEuros(centimes: number): string {
    const euros = centimes / 100;
    return euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}