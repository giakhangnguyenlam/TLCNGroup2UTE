package ute.tlcn.begroup2.Services.UserServices;

import com.google.api.services.drive.model.File;

public interface GoogleService {
     public File uploadFile(String fileName, String filePath, String mimeType);
}
