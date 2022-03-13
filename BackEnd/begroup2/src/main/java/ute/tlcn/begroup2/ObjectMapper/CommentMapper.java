package ute.tlcn.begroup2.ObjectMapper;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.CommentEntity;
import ute.tlcn.begroup2.Models.UserModels.CommentModel;

@Component
public class CommentMapper {

    private DateMapper dateMapper;

    @Autowired
    public CommentMapper(DateMapper dateMapper) {
        this.dateMapper = dateMapper;
    }


    public CommentEntity convertCommentModelToCommentEntity(CommentModel commentModel){
        CommentEntity commentEntity = new CommentEntity(commentModel.getId(), 
        commentModel.getProductId(), 
        commentModel.getUsername(), 
        commentModel.getComment(), 
        commentModel.getStar(), 
        new Date());

        return commentEntity;
    }

    public CommentModel convertCommentEntityToCommentModel(CommentEntity commentEntity){
        CommentModel commentModel = new CommentModel(commentEntity.getId(), 
        commentEntity.getProductId(), 
        commentEntity.getUsername(), 
        commentEntity.getComment(), 
        commentEntity.getStar(), 
        dateMapper.convertDateToString(commentEntity.getDate()));

        return commentModel;
    }
}