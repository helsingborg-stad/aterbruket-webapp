export default function convertToSwe(sweValues: any, allIndexes: any) {
    return allIndexes.map((i: number) => sweValues[i]);
}
