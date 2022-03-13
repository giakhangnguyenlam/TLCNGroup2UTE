package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.OrderDetailEntity;
import ute.tlcn.begroup2.Entities.OrderEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Entities.StoreEntity;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderDetailMapper;
import ute.tlcn.begroup2.ObjectMapper.StoreMapper;
import ute.tlcn.begroup2.Repositories.OrderDetailsRepository;
import ute.tlcn.begroup2.Repositories.OrderRepository;
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
    private OrderRepository orderRepository;

    @Autowired
    public StoreServiceImpl(StoreRepository storeRepository, StoreMapper storeMapper, GoogleService googleService, DateMapper dateMapper, ProductRepository productRepository, OrderDetailsRepository orderDetailsRepository, OrderDetailMapper orderDetailMapper, OrderRepository orderRepository) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
        this.googleService = googleService;
        this.dateMapper = dateMapper;
        this.productRepository = productRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderDetailMapper = orderDetailMapper;
        this.orderRepository = orderRepository;
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
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeId);
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        for (ProductEntity productEntity : productEntities) {
            orderDetailEntities.addAll(orderDetailsRepository.getByProductIdAndStatus(productEntity.getId(), "Chưa chuẩn bị"));
        }
        return orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
    }


    @Override
    public List<OrderDetailModel> getOrderProductByStoreIdAndDate(int storeId, String date) {
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeId);
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        for (ProductEntity productEntity : productEntities) {
            orderDetailEntities.addAll(orderDetailsRepository.getByProductIdAndDate(productEntity.getId(),dateMapper.convertStringToDate(date)));
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



    @Override
    public void updateOrderDetailStatus(int orderDetailId) {
        OrderDetailEntity orderDetailEntity = orderDetailsRepository.getById(orderDetailId);
        orderDetailEntity.setStatus("Đang chuẩn bị");
        orderDetailEntity = orderDetailsRepository.save(orderDetailEntity);
        List<OrderDetailEntity> orderDetailEntities = orderDetailsRepository.getByOrderId(orderDetailEntity.getOrderId());
        Optional<OrderDetailEntity> optionalOrderDetailEntity = orderDetailEntities.stream()
        .filter(orderDetailEntityy -> orderDetailEntityy.getStatus().equals("Chưa chuẩn bị"))
        .findAny();

        if(!optionalOrderDetailEntity.isPresent()){
            OrderEntity orderEntity = orderRepository.getById(orderDetailEntity.getOrderId());
            orderEntity.setOrderStatus("Đơn hàng đã chuẩn bị xong");
            orderRepository.save(orderEntity);
        }
    }


    @Override
    public List<OrderDetailModel> staticByStoreId(int storeId) {
        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        productEntities.stream().forEach(productEntity -> {
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatus(productEntity.getId(), "Đang chuẩn bị");
            orderDetailEntities.addAll(listOrderDetailEntities);
        });

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }

    @Override
    public List<OrderDetailModel> staticByStoreIdAndDate(int storeId, String date) {
        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        productEntities.stream().forEach(productEntity -> {
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatusAndDate(productEntity.getId(), "Đang chuẩn bị", dateMapper.convertStringToDate(date));
            orderDetailEntities.addAll(listOrderDetailEntities);
        });

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }

    @Override
    public List<OrderDetailModel> staticByStoreIdAndMonthAndYear(int storeId, String month, String year) {
        String startDate =  "01-"+ month +"-"+year;
        String endDate = "31-"+ month +"-"+year;
        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        productEntities.stream().forEach(productEntity -> {
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatusAndDateBetween(productEntity.getId(), "Đang chuẩn bị",dateMapper.convertStringToDate(startDate),dateMapper.convertStringToDate(endDate));
            orderDetailEntities.addAll(listOrderDetailEntities);
        });

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }






    @Override
    public List<OrderDetailModel> staticByStoreIdAndYear(int storeId, String year) {
        String startDate =  "01-01" +"-"+year;
        String endDate = "31-12"  +"-"+year;
        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        productEntities.stream().forEach(productEntity -> {
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatusAndDateBetween(productEntity.getId(), "Đang chuẩn bị",dateMapper.convertStringToDate(startDate),dateMapper.convertStringToDate(endDate));
            orderDetailEntities.addAll(listOrderDetailEntities);
        });

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }






    @Override
    public List<OrderDetailModel> staticByStoreIdAndDateOption(int storeId, String dateStart, String dateEnd) {
        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        productEntities.stream().forEach(productEntity -> {
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatusAndDateBetween(productEntity.getId(), "Đang chuẩn bị",dateMapper.convertStringToDate(dateStart),dateMapper.convertStringToDate(dateEnd));
            orderDetailEntities.addAll(listOrderDetailEntities);
        });

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }






    @Override
    public List<OrderDetailModel> staticByStoreIdAndQuarterOfYear(int storeId, int quarter, String year) {
        
        String startDate = "";
        String endDate = "";

        switch (quarter) {
            case 1:
                startDate+="01-01-"+year;
                endDate+="01-04-"+year;
                break;
            case 2:
                startDate+="01-04-"+year;
                endDate+="01-07-"+year;
                break;
            case 3:
                startDate+="01-07-"+year;
                endDate+="01-10-"+year;
                break;
            default:
                startDate+="01-10-"+year;
                endDate+="31-12-"+year;
                break;
        }

        StoreEntity storeEntity = storeRepository.getById(storeId);
        List<ProductEntity> productEntities = productRepository.getByStoreId(storeEntity.getId());
        List<OrderDetailEntity> orderDetailEntities = new ArrayList<>();
        
        for (ProductEntity productEntity: productEntities){
            List<OrderDetailEntity> listOrderDetailEntities = orderDetailsRepository.getByProductIdAndStatusAndDateBetween(productEntity.getId(), "Đang chuẩn bị", dateMapper.convertStringToDate(startDate),dateMapper.convertStringToDate(endDate));
            orderDetailEntities.addAll(listOrderDetailEntities);
        }

        List<OrderDetailModel> orderDetailModels = orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
        return orderDetailModels;
    }

    
    
}
