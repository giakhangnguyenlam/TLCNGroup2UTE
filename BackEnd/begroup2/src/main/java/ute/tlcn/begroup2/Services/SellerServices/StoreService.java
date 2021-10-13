package ute.tlcn.begroup2.Services.SellerServices;

import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Models.SellerModels.StoreModel;

public interface StoreService {
    public StoreModel createStore(StoreModel storeModel, MultipartFile multipartFile) throws Exception;
    public boolean existedByStoreName(String storeName);
}
