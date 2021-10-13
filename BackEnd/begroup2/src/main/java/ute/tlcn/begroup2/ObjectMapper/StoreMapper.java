package ute.tlcn.begroup2.ObjectMapper;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.StoreEntity;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;

@Component
public class StoreMapper {
    public StoreModel convertStoreEntityStoreModel(StoreEntity storeEntity){
        StoreModel storeModel = new StoreModel(storeEntity.getId(), 
        storeEntity.getUserId(),
        storeEntity.getNameStore(), 
        storeEntity.getStoreDescription(), 
        storeEntity.getImage());

        return storeModel;
    }

    public StoreEntity convertStoreModelTStoreEntity(StoreModel storeModel){
        StoreEntity storeEntity = new StoreEntity(storeModel.getId(),
        storeModel.getUserId(), 
        storeModel.getNameStore(), 
        storeModel.getStoreDescription(), 
        storeModel.getImage());

        return storeEntity;
    }
}
