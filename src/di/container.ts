import { SupabaseAssetRepository } from '../data/repositories/SupabaseAssetRepository';
import { GetAssetsUseCase } from '../domain/usecases/GetAssetsUseCase';
import { GetPortfolioSummaryUseCase } from '../domain/usecases/GetPortfolioSummaryUseCase';
import { GetAssetAllocationUseCase } from '../domain/usecases/GetAssetAllocationUseCase';
import { GetPortfolioHistoryUseCase } from '../domain/usecases/GetPortfolioHistoryUseCase';
import { AddAssetUseCase } from '../domain/usecases/AddAssetUseCase';
import { UpdateAssetUseCase } from '../domain/usecases/UpdateAssetUseCase';
import { DeleteAssetUseCase } from '../domain/usecases/DeleteAssetUseCase';
import { FilterPortfolioHistoryUseCase } from '../domain/usecases/FilterPortfolioHistoryUseCase';

// Switch to SupabaseAssetRepository
const assetRepository = new SupabaseAssetRepository();

export const getAssetsUseCase = new GetAssetsUseCase(assetRepository);
export const getPortfolioSummaryUseCase = new GetPortfolioSummaryUseCase(assetRepository);
export const getAssetAllocationUseCase = new GetAssetAllocationUseCase(assetRepository);
export const getPortfolioHistoryUseCase = new GetPortfolioHistoryUseCase(assetRepository);
export const addAssetUseCase = new AddAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const updateAssetUseCase = new UpdateAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const deleteAssetUseCase = new DeleteAssetUseCase(assetRepository, getPortfolioSummaryUseCase);
export const filterPortfolioHistoryUseCase = new FilterPortfolioHistoryUseCase(assetRepository);
