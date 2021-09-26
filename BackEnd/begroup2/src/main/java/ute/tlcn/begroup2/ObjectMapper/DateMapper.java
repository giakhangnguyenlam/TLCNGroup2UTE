package ute.tlcn.begroup2.ObjectMapper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class DateMapper {
    
    public String convertDateToString(Date date){
        DateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String dateString = simpleDateFormat.format(date);
        return dateString;
    }

    public Date convertStringToDate(String dateString){
        DateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date date;
        try {
            date = simpleDateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            date = null;
        }
        return date;
    }
}
