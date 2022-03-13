package ute.tlcn.begroup2.Services.GoogleServices.GoogleServiceImpl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;

// This class references from https://github.com/ttlang/DRIVE_REST_API_SPRING_BOOT/tree/master/GDrive

import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Paths;
import java.util.Collections;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Services.GoogleServices.GoogleService;

@Service
public class GoogleDriveServiceImpl implements GoogleService {


    private static final Logger LOGGER = LoggerFactory.getLogger(GoogleDriveServiceImpl.class);

	@Value("${google.service_account_email}")
	private String serviceAccountEmail;
	
	@Value("${google.application_name}")
	private String applicationName;

	@Value("${google.service_account_key}")
	private String serviceAccountKey;

	@Value("${google.folder_id}")
	private String folderID;

	public Drive getDriveService() {
		Drive service = null;
		try {
			// URL resource = GoogleDriveServiceImpl.class.getResource("/");
			// System.out.println("Path key: "+resource.toURI());
			String userDirectory = System.getProperty("user.dir");
			// System.out.println(userDirectory);
			java.io.File key = Paths.get(userDirectory+"/target/classes/evident-wind-327616-32382019eb7e.p12").toFile();
			HttpTransport httpTransport = new NetHttpTransport();
			JacksonFactory jsonFactory = new JacksonFactory();

			GoogleCredential credential = new GoogleCredential.Builder().setTransport(httpTransport)
					.setJsonFactory(jsonFactory).setServiceAccountId(serviceAccountEmail)
					.setServiceAccountScopes(Collections.singleton(DriveScopes.DRIVE))
					.setServiceAccountPrivateKeyFromP12File(key).build();
			service = new Drive.Builder(httpTransport, jsonFactory, credential).setApplicationName(applicationName)
					.setHttpRequestInitializer(credential).build();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			System.out.println("Faie drive: "+ e.getMessage());
		}

		return service;

	}



    @Override
    public File uploadFile(String fileName, String filePath, String mimeType) {
        File file = new File();
		try {
			java.io.File fileUpload = new java.io.File(filePath);
			com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
			fileMetadata.setMimeType(mimeType);
			fileMetadata.setName(fileName);
			fileMetadata.setParents(Collections.singletonList(folderID));
			com.google.api.client.http.FileContent fileContent = new FileContent(mimeType, fileUpload);
			file = getDriveService().files().create(fileMetadata, fileContent)
					.setFields("id,webContentLink,webViewLink").execute();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return file;
    }



	@Override
	public String saveImage(MultipartFile multifile) {
		java.io.File file1 = new java.io.File(multifile.getOriginalFilename());
		
		System.out.println("file path: "+file1.getAbsolutePath());
		System.out.println("file name: "+file1.getName());
        try {
			FileOutputStream fos = new FileOutputStream( file1 );
			fos.write( multifile.getBytes() );
        	fos.close();
            // multifile.transferTo(file1);
            File file = uploadFile(file1.getName(), file1.getAbsolutePath(), URLConnection.guessContentTypeFromName(file1.getName()));
			// System.out.println("web view link: "+file.getWebViewLink());
			// System.out.println("web content link: " + file.getWebContentLink());
			// System.out.println("web description: "+file.getDescription());
            return file.getWebContentLink();
        }
        catch (IOException e) {
            return "";
        }
	}
    
}
