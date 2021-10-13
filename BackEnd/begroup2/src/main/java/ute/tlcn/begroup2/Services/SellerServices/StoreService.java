package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Models.SellerModels.StoreModel;

public interface StoreService {
    public StoreModel createStore(StoreModel storeModel, MultipartFile multipartFile) throws Exception;
    public boolean existedByStoreName(String storeName);
    public List<StoreModel> getStoreByUserId(int userId);
    public void deleteStore(int id);
    public StoreModel updateStoreWithoutImage(int id, StoreModel storeModel)  throws Exception;
    public StoreModel updateStoreWithImage(int id, MultipartFile multipartFile) throws Exception;
}
