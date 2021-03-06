package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;

public interface StoreService {
    public StoreModel createStore(StoreModel storeModel, MultipartFile multipartFile) throws Exception;
    public boolean existedByStoreName(String storeName);
    public List<StoreModel> getStoreByUserId(int userId);
    public void deleteStore(int id);
    public StoreModel updateStoreWithoutImage(int id, StoreModel storeModel)  throws Exception;
    public StoreModel updateStoreWithImage(int id, MultipartFile multipartFile) throws Exception;
    public List<OrderDetailModel> getOrderProductByStoreId(int storeId);
    public List<OrderDetailModel> getOrderProductByStoreIdAndDate(int storeId, String date);
    public StoreModel getStoreByStoreId(int storeId) throws Exception;
    public void updateOrderDetailStatus(int orderDetailId);
    public List<OrderDetailModel> staticByStoreId(int storeId);
    public List<OrderDetailModel> staticByStoreIdAndDate(int storeId, String date);
    public List<OrderDetailModel> staticByStoreIdAndMonthAndYear(int storeId, String month, String year);
    public List<OrderDetailModel> staticByStoreIdAndYear(int storeId, String year);
    public List<OrderDetailModel> staticByStoreIdAndDateOption(int storeId, String dateStart, String dateEnd);
    public List<OrderDetailModel> staticByStoreIdAndQuarterOfYear(int storeId, int quarter, String year);
}
