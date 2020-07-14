import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const categories = this.find();
    const incomes = (await categories).reduce((total, element) => {
      if (element.type === 'income')
        return Number(total) + Number(element.value);
      return Number(total);
    }, 0);
    const outcomes = (await categories).reduce((total, element) => {
      if (element.type === 'outcome')
        return Number(total) + Number(element.value);
      return Number(total);
    }, 0);
    const total = incomes - outcomes;

    return {
      income: incomes,
      outcome: outcomes,
      total,
    };
  }
}

export default TransactionsRepository;
