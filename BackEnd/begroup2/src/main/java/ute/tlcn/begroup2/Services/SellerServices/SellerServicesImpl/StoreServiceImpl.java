package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.OrderDetailEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Entities.StoreEntity;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderDetailMapper;
import ute.tlcn.begroup2.ObjectMapper.StoreMapper;
import ute.tlcn.begroup2.Repositories.OrderDetailsRepository;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Repositories.StoreRepository;
import ute.tlcn.begroup2.Services.GoogleServices.GoogleService;
import ute.tlcn.begroup2.Services.SellerServices.StoreService;

@Service
public class StoreServiceImpl implements StoreService{


    private StoreRepository storeRepository;
    private StoreMapper storeMapper;
    private GoogleService googleService;
    private DateMapper dateMapper;
    private ProductRepository productRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private OrderDetailMapper orderDetailMapper;

    @Autowired
    public StoreServiceImpl(StoreRepository storeRepository, StoreMapper storeMapper, GoogleService googleService, DateMapper dateMapper, ProductRepository productRepository, OrderDetailsRepository orderDetailsRepository, OrderDetailMapper orderDetailMapper) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
        this.googleService = googleService;
        this.dateMapper = dateMapper;
        this.productRepository = productRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderDetailMapper = orderDetailMapper;
    }
    
    
    
    

    @Override
    public StoreModel createStore(StoreModel storeModel, MultipartFile multipartFile) throws Exception {
        if(existedByStoreName(storeModel.getNameStore())){
            throw new Exception("Store is already existed");
        }
        else{
            String image = googleService.saveImage(multipartFile);
            storeModel.setImage(image);
            StoreEntity storeEntity = storeRepository.save(storeMapper.convertStoreModelTStoreEntity(storeModel));
            return storeMapper.convertStoreEntityStoreModel(storeEntity);
        }
    }

    @Override
    public boolean existedByStoreName(String storeName) {
        return storeRepository.existsByNameStore(storeName);
    }


    @Override
    public List<StoreModel> getStoreByUserId(int userId) {
        List<StoreEntity> storeEntities = storeRepository.getByUserId(userId);
        List<StoreModel> storeModels = storeEntities.stream()
        .map(storeEntity -> {
            return storeMapper.convertStoreEntityStoreModel(storeEntity);
        })
        .collect(Collectors.toList());

        return storeModels;
    }


    @Override
    public void deleteStore(int id) {
        storeRepository.deleteById(id);
    }


    @Override
    public StoreModel updateStoreWithoutImage(int id, StoreModel storeModel) throws Exception {
        Optional<StoreEntity> optionalStoreEntity = storeRepository.findById(id);
        if(optionalStoreEntity.isPresent()){
            StoreEntity storeEntity = optionalStoreEntity.get();
            storeEntity.setUserId(storeModel.getUserId());
            storeEntity.setNameStore(storeModel.getNameStore());
            storeEntity.setStoreDescription(storeModel.getStoreDescription());
            return storeMapper.convertStoreEntityStoreModel(storeRepository.save(storeEntity));
        }
        else{
            throw new Exception("Not found exception");
        }

    }


    @Override
    public StoreModel updateStoreWithImage(int id, MultipartFile multipartFile) throws Exception {
        Optional<StoreEntity> optionalStoreEntity = storeRepository.findById(id);
        if (optionalStoreEntity.isPresent()) {
            StoreEntity storeEntity = optionalStoreEntity.get();
            String image = googleService.saveImage(multipartFile);
            storeEntity.setImage(image);
            return storeMapper.convertStoreEntityStoreModel(storeRepository.save(storeEntity));
        } else {
            throw new Exception("Not found exception");
        }
    }


    @Override
    public List<OrderDetailModel> getOrderProductByStoreId(int storeId) {
        String date = dateMapper.convertDateToString(new Date());
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeId);
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        for (ProductEntity productEntity : productEntities) {
            orderDetailEntities.addAll(orderDetailsRepository.getByProductIdAndDate(productEntity.getId(), date));
        }
        return orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
    }


    @Override
    public List<OrderDetailModel> getOrderProductByStoreIdAndDate(int storeId, String date) {
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeId);
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        for (ProductEntity productEntity : productEntities) {
            orderDetailEntities.addAll(orderDetailsRepository.getByProductIdAndDate(productEntity.getId(), date));
        }
        return orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
    }





    @Override
    public StoreModel getStoreByStoreId(int storeId) throws Exception {
        Optional<StoreEntity> optionalStoreEntity = storeRepository.findById(storeId);
        if(optionalStoreEntity.isPresent()){
            return storeMapper.convertStoreEntityStoreModel(optionalStoreEntity.get());
        }
        else{
            throw new NotFoundException("Can't find store");
        }
    }
    
    
}
