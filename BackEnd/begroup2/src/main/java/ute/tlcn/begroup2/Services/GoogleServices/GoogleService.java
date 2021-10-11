package ute.tlcn.begroup2.Services.GoogleServices;

import com.google.api.services.drive.model.File;

import org.springframework.web.multipart.MultipartFile;

public interface GoogleService {
     public File uploadFile(String fileName, String filePath, String mimeType);
     public String saveImage(MultipartFile multifile);
}
