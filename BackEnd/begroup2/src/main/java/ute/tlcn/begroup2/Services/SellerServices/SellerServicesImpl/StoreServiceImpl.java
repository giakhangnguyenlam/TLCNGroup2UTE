package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import org.apache.catalina.StoreManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Entities.StoreEntity;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.ObjectMapper.StoreMapper;
import ute.tlcn.begroup2.Repositories.StoreRepository;
import ute.tlcn.begroup2.Services.GoogleServices.GoogleService;
import ute.tlcn.begroup2.Services.SellerServices.StoreService;

@Service
public class StoreServiceImpl implements StoreService{


    private StoreRepository storeRepository;
    private StoreMapper storeMapper;
    private GoogleService googleService;
    @Autowired
    public StoreServiceImpl(StoreRepository storeRepository, StoreMapper storeMapper, GoogleService googleService) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
        this.googleService = googleService;
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
    
}
