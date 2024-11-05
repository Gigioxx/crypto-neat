export interface userTransaction {
  userEmail: string,
  balanceUsed: number,
  crypto: string,
  date: string,
  price: number,
  quantity: number,
  action: string,
}

export type userTransactionsList = userTransaction[];