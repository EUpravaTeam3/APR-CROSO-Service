package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.WorkField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@EnableJpaRepositories
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByPIB(String PIB);
    @Query("SELECT c.workFields FROM Company c WHERE c.id = :companyId")
    List<WorkField> findWorkFieldsByCompanyId(@Param("companyId") Long companyId);


    //Stats prikaz funkcija
    @Query("SELECT w.name, COUNT(c) " +
            "FROM Company c JOIN c.workFields w " +
            "GROUP BY w.name")
    List<Object[]> countCompaniesByWorkfield();



    // Nađi firme sa istim vlasnikom
    List<Company> findByOwnerUcnAndIdNot(String ownerUcn, Long excludeId);

    // Nađi firme sa istim delatnostima (pretpostavljam da u WorkField imaš šifru aktivnosti)
    @Query("SELECT DISTINCT c FROM Company c JOIN c.workFields wf " +
            "WHERE wf.code IN :activityCodes AND c.id <> :excludeId")
    List<Company> findByActivityCodes(@Param("activityCodes") List<String> activityCodes,
                                      @Param("excludeId") Long excludeId);

}
