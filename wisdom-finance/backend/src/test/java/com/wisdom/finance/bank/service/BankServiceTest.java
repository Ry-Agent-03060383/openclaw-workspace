package com.wisdom.finance.bank.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.bank.entity.BankApiLog;
import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.mapper.BankApiLogRepository;
import com.wisdom.finance.bank.mapper.BankProductRepository;
import com.wisdom.finance.user.entity.Bank;
import com.wisdom.finance.user.mapper.BankRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BankServiceTest {

    @Mock
    private BankRepository bankRepository;

    @Mock
    private BankProductRepository bankProductRepository;

    @Mock
    private BankApiLogRepository bankApiLogRepository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private BankService bankService;

    private Bank testBank;

    @BeforeEach
    void setUp() {
        testBank = new Bank();
        testBank.setId(1L);
        testBank.setBankCode("ICBC");
        testBank.setBankName("中国工商银行");
        testBank.setShortName("工行");
        testBank.setContactPerson("张三");
        testBank.setContactPhone("13800138000");
        testBank.setContactEmail("contact@icbc.com");
        testBank.setAddress("北京市西城区金融街");
        testBank.setStatus("ACTIVE");
        testBank.setApiUrl("https://api.icbc.com.cn");
        testBank.setApiKey("api-key-12345");
    }

    // ======================== createBank ========================

    @Test
    void createBank_ShouldSetStatusActiveAndSave() {
        Bank input = new Bank();
        input.setBankName("中国银行");

        when(bankRepository.save(any(Bank.class))).thenAnswer(i -> {
            Bank saved = i.getArgument(0);
            saved.setId(2L);
            return saved;
        });

        Bank result = bankService.createBank(input);

        assertNotNull(result);
        assertEquals("中国银行", result.getBankName());
        assertEquals("ACTIVE", result.getStatus());
        verify(bankRepository).save(input);
    }

    // ======================== updateBank ========================

    @Test
    void updateBank_ShouldUpdateOnlyNonNullFields() {
        Bank existing = new Bank();
        existing.setId(1L);
        existing.setBankName("旧名称");
        existing.setShortName("旧简称");
        existing.setContactPerson("旧联系人");
        existing.setContactPhone("010-12345678");
        existing.setContactEmail("old@test.com");
        existing.setAddress("旧地址");
        existing.setStatus("ACTIVE");
        existing.setApiUrl("https://old.api.com");
        existing.setApiKey("old-key");
        existing.setRemark("旧备注");

        Bank update = new Bank();
        update.setBankName("新名称");
        update.setShortName("新简称");

        when(bankRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(bankRepository.save(any(Bank.class))).thenAnswer(i -> i.getArgument(0));

        Bank result = bankService.updateBank(1L, update);

        assertEquals("新名称", result.getBankName());
        assertEquals("新简称", result.getShortName());
        assertEquals("旧联系人", result.getContactPerson());
        assertEquals("010-12345678", result.getContactPhone());
        verify(bankRepository).findById(1L);
        verify(bankRepository).save(existing);
    }

    @Test
    void updateBank_ShouldThrowWhenBankNotFound() {
        Bank update = new Bank();
        update.setBankName("新名称");

        when(bankRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> bankService.updateBank(999L, update));
        assertEquals("银行不存在", ex.getMessage());
        verify(bankRepository).findById(999L);
        verifyNoMoreInteractions(bankRepository);
    }

    // ======================== getBanks ========================

    @Test
    void getBanks_ShouldReturnAllBanks() {
        Bank bank2 = new Bank();
        bank2.setId(2L);
        bank2.setBankName("中国农业银行");

        when(bankRepository.findAll()).thenReturn(List.of(testBank, bank2));

        List<Bank> result = bankService.getBanks();

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(b -> "中国工商银行".equals(b.getBankName())));
        assertTrue(result.stream().anyMatch(b -> "中国农业银行".equals(b.getBankName())));
        verify(bankRepository).findAll();
    }

    @Test
    void getBanks_ShouldReturnEmptyListWhenNoBanks() {
        when(bankRepository.findAll()).thenReturn(List.of());

        List<Bank> result = bankService.getBanks();

        assertTrue(result.isEmpty());
        verify(bankRepository).findAll();
    }

    // ======================== getBank ========================

    @Test
    void getBank_ShouldReturnBankWhenFound() {
        when(bankRepository.findById(1L)).thenReturn(Optional.of(testBank));

        Bank result = bankService.getBank(1L);

        assertNotNull(result);
        assertEquals("中国工商银行", result.getBankName());
        verify(bankRepository).findById(1L);
    }

    @Test
    void getBank_ShouldReturnNullWhenNotFound() {
        when(bankRepository.findById(999L)).thenReturn(Optional.empty());

        Bank result = bankService.getBank(999L);

        assertNull(result);
        verify(bankRepository).findById(999L);
    }

    // ======================== createBankProduct ========================

    @Test
    void createBankProduct_ShouldSetStatusActiveAndSave() {
        BankProduct product = new BankProduct();
        product.setProductCode("LOAN-001");
        product.setProductName("经营贷");
        product.setBankId(1L);

        when(bankProductRepository.save(any(BankProduct.class))).thenAnswer(i -> {
            BankProduct saved = i.getArgument(0);
            saved.setId(100L);
            return saved;
        });

        BankProduct result = bankService.createBankProduct(product);

        assertNotNull(result);
        assertEquals("经营贷", result.getProductName());
        assertEquals("ACTIVE", result.getStatus());
        verify(bankProductRepository).save(product);
    }

    // ======================== getBankProducts ========================

    @Test
    void getBankProducts_ShouldReturnActiveProducts() {
        BankProduct p1 = new BankProduct();
        p1.setProductName("产品A");
        BankProduct p2 = new BankProduct();
        p2.setProductName("产品B");

        when(bankProductRepository.findByStatus("ACTIVE")).thenReturn(List.of(p1, p2));

        List<BankProduct> result = bankService.getBankProducts();

        assertEquals(2, result.size());
        verify(bankProductRepository).findByStatus("ACTIVE");
    }

    @Test
    void getBankProducts_ShouldReturnEmptyWhenNoActiveProducts() {
        when(bankProductRepository.findByStatus("ACTIVE")).thenReturn(List.of());

        List<BankProduct> result = bankService.getBankProducts();

        assertTrue(result.isEmpty());
        verify(bankProductRepository).findByStatus("ACTIVE");
    }

    // ======================== getBankProductsByBank ========================

    @Test
    void getBankProductsByBank_ShouldReturnProductsForBank() {
        BankProduct p1 = new BankProduct();
        p1.setBankId(1L);
        p1.setProductName("工行经营贷");

        when(bankProductRepository.findByBankId(1L)).thenReturn(List.of(p1));

        List<BankProduct> result = bankService.getBankProductsByBank(1L);

        assertEquals(1, result.size());
        assertEquals("工行经营贷", result.get(0).getProductName());
        verify(bankProductRepository).findByBankId(1L);
    }

    @Test
    void getBankProductsByBank_ShouldReturnEmptyWhenNoProducts() {
        when(bankProductRepository.findByBankId(999L)).thenReturn(List.of());

        List<BankProduct> result = bankService.getBankProductsByBank(999L);

        assertTrue(result.isEmpty());
        verify(bankProductRepository).findByBankId(999L);
    }

    // ======================== callBankApi ========================

    @Test
    void callBankApi_ShouldReturnMockResponseOnSuccess() {
        BankApiLog savedLog = new BankApiLog();
        savedLog.setId(10L);
        savedLog.setStatus("PROCESSING");

        when(bankRepository.findById(1L)).thenReturn(Optional.of(testBank));
        when(bankApiLogRepository.save(any(BankApiLog.class))).thenAnswer(i -> {
            BankApiLog arg = i.getArgument(0);
            if (arg.getId() == null) {
                arg.setId(10L);
            }
            return arg;
        });

        String result = bankService.callBankApi(
                1L, "LOAN_QUERY", "/api/v1/query",
                Map.of("loanId", "L123"), String.class,
                100L, "LOAN");

        assertNotNull(result);
        assertTrue(result.contains("0000"));
        assertTrue(result.contains("success"));
        verify(bankRepository).findById(1L);
        verify(bankApiLogRepository, times(2)).save(any(BankApiLog.class));
    }

    @Test
    void callBankApi_ShouldThrowWhenBankNotFound() {
        when(bankRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> bankService.callBankApi(
                        999L, "LOAN_QUERY", "/api/v1/query",
                        Map.of(), String.class, null, null));
        assertEquals("银行不存在", ex.getMessage());
        verify(bankRepository).findById(999L);
    }

    // ======================== getApiLogs ========================

    @Test
    void getApiLogs_ShouldFilterByBankId() {
        BankApiLog log = new BankApiLog();
        log.setBankId(1L);
        when(bankApiLogRepository.findByBankId(1L)).thenReturn(List.of(log));

        List<BankApiLog> result = bankService.getApiLogs(1L, null, null);

        assertEquals(1, result.size());
        verify(bankApiLogRepository).findByBankId(1L);
        verifyNoMoreInteractions(bankApiLogRepository);
    }

    @Test
    void getApiLogs_ShouldFilterByStatus() {
        BankApiLog log = new BankApiLog();
        log.setStatus("FAILED");
        when(bankApiLogRepository.findByStatus("FAILED")).thenReturn(List.of(log));

        List<BankApiLog> result = bankService.getApiLogs(null, "FAILED", null);

        assertEquals(1, result.size());
        verify(bankApiLogRepository).findByStatus("FAILED");
        verifyNoMoreInteractions(bankApiLogRepository);
    }

    @Test
    void getApiLogs_ShouldFilterByApiType() {
        BankApiLog log = new BankApiLog();
        log.setApiType("LOAN_QUERY");
        when(bankApiLogRepository.findByApiType("LOAN_QUERY")).thenReturn(List.of(log));

        List<BankApiLog> result = bankService.getApiLogs(null, null, "LOAN_QUERY");

        assertEquals(1, result.size());
        verify(bankApiLogRepository).findByApiType("LOAN_QUERY");
        verifyNoMoreInteractions(bankApiLogRepository);
    }

    @Test
    void getApiLogs_ShouldReturnAllWhenNoFilters() {
        BankApiLog log1 = new BankApiLog();
        log1.setId(1L);
        BankApiLog log2 = new BankApiLog();
        log2.setId(2L);
        when(bankApiLogRepository.findAll()).thenReturn(List.of(log1, log2));

        List<BankApiLog> result = bankService.getApiLogs(null, null, null);

        assertEquals(2, result.size());
        verify(bankApiLogRepository).findAll();
    }
}