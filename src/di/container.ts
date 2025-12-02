import { SupabaseAssetRepository } from '../data/repositories/SupabaseAssetRepository';
import { GetAssetsUseCase } from '../domain/usecases/GetAssetsUseCase';
import { GetPortfolioSummaryUseCase } from '../domain/usecases/GetPortfolioSummaryUseCase';
import { GetAssetAllocationUseCase } from '../domain/usecases/GetAssetAllocationUseCase';
import { GetPortfolioHistoryUseCase } from '../domain/usecases/GetPortfolioHistoryUseCase';
import { AddAssetUseCase } from '../domain/usecases/AddAssetUseCase';
import { UpdateAssetUseCase } from '../domain/usecases/UpdateAssetUseCase';
import { DeleteAssetUseCase } from '../domain/usecases/DeleteAssetUseCase';
import { FilterPortfolioHistoryUseCase } from '../domain/usecases/FilterPortfolioHistoryUseCase';
import { AddTransactionUseCase } from '../domain/usecases/AddTransactionUseCase';
import { UpdateTransactionUseCase } from '../domain/usecases/UpdateTransactionUseCase';
import { SupabaseCashAccountRepository } from '../data/repositories/SupabaseCashAccountRepository';
import { GetAccountsUseCase } from '../domain/usecases/GetAccountsUseCase';
import { AddAccountUseCase } from '../domain/usecases/AddAccountUseCase';
import { GetCashTransactionsUseCase } from '../domain/usecases/GetCashTransactionsUseCase';
import { AddCashTransactionUseCase } from '../domain/usecases/AddCashTransactionUseCase';

// Switch to SupabaseAssetRepository
const assetRepository = new SupabaseAssetRepository();
const cashAccountRepository = new SupabaseCashAccountRepository();

export const getAssetsUseCase = new GetAssetsUseCase(assetRepository);
export const getPortfolioSummaryUseCase = new GetPortfolioSummaryUseCase(assetRepository, cashAccountRepository);
export const getAssetAllocationUseCase = new GetAssetAllocationUseCase(assetRepository, cashAccountRepository);
export const getPortfolioHistoryUseCase = new GetPortfolioHistoryUseCase(assetRepository);
export const addAssetUseCase = new AddAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const updateAssetUseCase = new UpdateAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const deleteAssetUseCase = new DeleteAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const filterPortfolioHistoryUseCase = new FilterPortfolioHistoryUseCase(assetRepository);
export const addTransactionUseCase = new AddTransactionUseCase(assetRepository);
export const updateTransactionUseCase = new UpdateTransactionUseCase(assetRepository);

export const getAccountsUseCase = new GetAccountsUseCase(cashAccountRepository);
export const addAccountUseCase = new AddAccountUseCase(cashAccountRepository);
export const getCashTransactionsUseCase = new GetCashTransactionsUseCase(cashAccountRepository);
export const addCashTransactionUseCase = new AddCashTransactionUseCase(cashAccountRepository);
