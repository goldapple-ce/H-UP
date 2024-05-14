package com.a702.hup.global.util;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Util {
    private static final String SERVICE_NAME = "H-UP";

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    private final S3Template s3Template;

    /**
     * @author 이경태
     * @date 2024-05-14
     * @description 이미지 업로드 함수
     **/
    @Transactional
    public String upload(MultipartFile file, ImageType imageType, int id) {
        log.info("[+] S3Util :: upload :: start");
        log.info("[+] S3Util :: upload :: id : {}", id);
        // 파일 원본
        String originFileName = file.getOriginalFilename();
        log.info("[+] S3Util :: upload :: originFileName : {}", originFileName);

        // 파일 확장자
        String extension = StringUtils.getFilenameExtension(originFileName);
        log.info("[+] S3Util :: upload :: extension : {}", extension);

        // 저장할 파일명
        String savedFileName = generateFileName(imageType, id) + "." + extension;
        log.info("[+] S3Util :: upload :: savedFileName : {}", savedFileName);

        // 업로드 전 삭제
        this.removeFile(savedFileName);
        log.info("[+] S3Util :: upload :: remove complete");

        String imageUrl = null;
        // 업로드
        try {
            imageUrl = s3Template.upload(
                    bucketName,
                    savedFileName,
                    file.getInputStream(),
                    ObjectMetadata.builder()
                            .contentType(extension)
                            .build()
            ).getURL().toString();
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.API_ERROR_INPUT_INVALID_VALUE);
        }

        // url 반환
        return imageUrl;
    }

    /**
     * @author 이경태
     * @date 2024-05-14
     * @description 파일 삭제
     **/
    private void removeFile(String oldFileName) {
        s3Template.deleteObject(bucketName, oldFileName);
    }

    /**
     * @author 이경태
     * @date 2024-05-14
     * @description 파일 명 생성 함수. Template : SERVICE/TYPE/ID.EXTENSION
     **/
    private String generateFileName(ImageType imageType, int id) {
        return SERVICE_NAME + "/" + imageType.name() + "/" + id;
    }
}
