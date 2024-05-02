package com.a702.hup.domain.documents.mongodb;

import com.a702.hup.domain.documents.mongodb.entity.DocumentsMongo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DocumentsMongoService {
    private final DocumentsMongoRepository documentsMongoRepository;

    /**
     * @author 손현조
     * @date 2024-04-30
     * @description 문서 영구 저장 (MongoDB)
     **/
    public void save(String documentsId, String content) {
        DocumentsMongo documentsMongo = findOrCreateDocuments(documentsId);
        documentsMongo.updateContent(content);
        documentsMongoRepository.save(documentsMongo);
    }

    /**
     * @author 손현조
     * @date 2024-04-30
     * @description 문서 조회, 없을 시 생성
     **/
    private DocumentsMongo findOrCreateDocuments(String documentsId) {
        return documentsMongoRepository.findById(documentsId).orElseGet(
                () -> DocumentsMongo.builder()._id(documentsId).build()
        );
    }

}
