export const formatDate = (date: string) => {
    const time = date.split('T')[1]
    const orderDate = date.split('T')[0].replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`)
    const orderTime = time.slice(0, -time.length + 5)
    const currentDate = orderDate + ' ' + orderTime
    return currentDate
}