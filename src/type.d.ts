export type CategoryType = 'income' | 'expense';
export interface Category {
    id: string,
    name: string,
    type: CategoryType
}
export interface ApiCategory {
   name: string,
   type: CategoryType
}
export interface ApiCategoriesList {
    [id: string]: ApiCategory
}
export interface Transaction {
    id: string,
    category: Category,
    createAt: string,
    amount: number
}
export interface ApiTransaction {
    categoryId: string,
    amount: number,
    createdAt: string
}
export interface ApiTransactionsList {
    [id: string]: ApiTransaction
}