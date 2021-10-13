package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    
    
}
