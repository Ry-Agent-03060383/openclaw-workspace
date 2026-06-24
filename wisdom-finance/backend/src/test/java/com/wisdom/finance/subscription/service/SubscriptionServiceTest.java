package com.wisdom.finance.subscription.service;

import com.wisdom.finance.subscription.entity.Subscription;
import com.wisdom.finance.subscription.entity.SubscriptionServiceEntity;
import com.wisdom.finance.subscription.mapper.SubscriptionRepository;
import com.wisdom.finance.subscription.mapper.SubscriptionServiceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock private SubscriptionServiceRepository svcRepo;
    @Mock private SubscriptionRepository subRepo;
    @InjectMocks private SubscriptionService service;

    private SubscriptionServiceEntity makeService(Long id) {
        SubscriptionServiceEntity s = new SubscriptionServiceEntity();
        s.setId(id);
        s.setServiceName("信用报告订阅");
        s.setServiceType("CREDIT_REPORT");
        s.setTargetRole("SME");
        s.setPrice(BigDecimal.valueOf(99));
        s.setBillingCycle("MONTHLY");
        s.setDuration(30);
        s.setUsageLimit(100);
        s.setConcurrentLimit(5);
        s.setStatus("ACTIVE");
        return s;
    }

    private Subscription makeSub(Long id, Long userId, Long serviceId) {
        Subscription s = new Subscription();
        s.setId(id);
        s.setUserId(userId);
        s.setServiceId(serviceId);
        s.setStatus("ACTIVE");
        s.setStartTime(LocalDateTime.now().minusDays(2));
        s.setEndTime(LocalDateTime.now().plusDays(28));
        s.setAmount(BigDecimal.valueOf(99));
        s.setPaymentStatus("PAID");
        s.setAutoRenew(false);
        s.setUsageCount(5);
        s.setRemainingCount(95);
        return s;
    }

    @Test
    void createSubscriptionService_shouldSaveWithDefaults() {
        SubscriptionServiceEntity s = makeService(null);
        when(svcRepo.save(any())).thenAnswer(i -> i.getArgument(0));
        SubscriptionServiceEntity result = service.createSubscriptionService(s);
        assertEquals("ACTIVE", result.getStatus());
        assertFalse(result.getIsRecommended());
        assertEquals(0, result.getSortOrder());
        assertFalse(result.getSupportTrial());
        assertFalse(result.getSupportRefund());
        assertNotNull(result.getServiceCode());
        verify(svcRepo).save(any());
    }

    @Test
    void updateSubscriptionService_shouldUpdateFields() {
        SubscriptionServiceEntity existing = makeService(1L);
        existing.setFeatureList("f1,f2");
        existing.setTechnicalSupport("电话支持");

        SubscriptionServiceEntity updates = new SubscriptionServiceEntity();
        updates.setServiceName("升级订阅");
        updates.setPrice(BigDecimal.valueOf(199));

        when(svcRepo.findById(1L)).thenReturn(Optional.of(existing));
        when(svcRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        SubscriptionServiceEntity result = service.updateSubscriptionService(1L, updates);
        assertEquals("升级订阅", result.getServiceName());
        assertEquals(BigDecimal.valueOf(199), result.getPrice());
        assertEquals("CREDIT_REPORT", result.getServiceType()); // unchanged
        verify(svcRepo).save(any());
    }

    @Test
    void updateSubscriptionService_notFound_shouldThrow() {
        when(svcRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.updateSubscriptionService(99L, new SubscriptionServiceEntity()));
    }

    @Test
    void getSubscriptionService_shouldReturnService() {
        when(svcRepo.findById(1L)).thenReturn(Optional.of(makeService(1L)));
        assertNotNull(service.getSubscriptionService(1L));
        assertNull(service.getSubscriptionService(99L));
    }

    @Test
    void getSubscriptionServices_shouldFilterByType() {
        when(svcRepo.findByServiceType("CREDIT_REPORT")).thenReturn(List.of(makeService(1L)));
        assertEquals(1, service.getSubscriptionServices("CREDIT_REPORT", null, null).size());
    }

    @Test
    void getSubscriptionServices_shouldFilterByRole() {
        when(svcRepo.findByTargetRole("SME")).thenReturn(List.of(makeService(1L)));
        assertEquals(1, service.getSubscriptionServices(null, "SME", null).size());
    }

    @Test
    void getSubscriptionServices_shouldFilterByStatus() {
        when(svcRepo.findByStatus("ACTIVE")).thenReturn(List.of(makeService(1L)));
        assertEquals(1, service.getSubscriptionServices(null, null, "ACTIVE").size());
    }

    @Test
    void getSubscriptionServices_shouldReturnAll() {
        when(svcRepo.findAll()).thenReturn(List.of(makeService(1L), makeService(2L)));
        assertEquals(2, service.getSubscriptionServices(null, null, null).size());
    }

    @Test
    void createSubscription_shouldCreateSuccessfully() {
        when(svcRepo.findById(1L)).thenReturn(Optional.of(makeService(1L)));
        when(subRepo.findByUserIdAndServiceId(10L, 1L)).thenReturn(Optional.empty());

        Subscription sub = new Subscription();
        sub.setUserId(10L);
        sub.setServiceId(1L);
        when(subRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        Subscription result = service.createSubscription(sub);
        assertEquals("ACTIVE", result.getStatus());
        assertEquals("PENDING", result.getPaymentStatus());
        assertEquals(100, result.getRemainingCount());
        assertNotNull(result.getSubscriptionNo());
        verify(subRepo).save(any());
    }

    @Test
    void createSubscription_withExistingActive_shouldThrow() {
        SubscriptionServiceEntity s = makeService(1L);
        when(svcRepo.findById(1L)).thenReturn(Optional.of(s));

        Subscription existing = makeSub(1L, 10L, 1L);
        when(subRepo.findByUserIdAndServiceId(10L, 1L)).thenReturn(Optional.of(existing));

        Subscription sub = new Subscription();
        sub.setUserId(10L);
        sub.setServiceId(1L);
        assertThrows(RuntimeException.class, () -> service.createSubscription(sub));
    }

    @Test
    void paySubscription_shouldUpdatePaymentStatus() {
        Subscription sub = makeSub(1L, 10L, 1L);
        when(subRepo.findById(1L)).thenReturn(Optional.of(sub));
        when(subRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        Subscription result = service.paySubscription(1L, "WECHAT", "tx123");
        assertEquals("PAID", result.getPaymentStatus());
        assertEquals("WECHAT", result.getPaymentMethod());
        assertEquals("tx123", result.getTransactionId());
    }

    @Test
    void cancelSubscription_shouldSetCancelled() {
        Subscription sub = makeSub(1L, 10L, 1L);
        when(subRepo.findById(1L)).thenReturn(Optional.of(sub));
        when(subRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        Subscription result = service.cancelSubscription(1L, "不再需要");
        assertEquals("CANCELLED", result.getStatus());
        assertEquals("不再需要", result.getCancelReason());
    }

    @Test
    void renewSubscription_shouldExtendEndTime() {
        SubscriptionServiceEntity s = makeService(1L);
        s.setDuration(30);
        Subscription sub = makeSub(1L, 10L, 1L);
        LocalDateTime originalEnd = sub.getEndTime();

        when(subRepo.findById(1L)).thenReturn(Optional.of(sub));
        when(svcRepo.findById(1L)).thenReturn(Optional.of(s));
        when(subRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        Subscription result = service.renewSubscription(1L);
        assertTrue(result.getEndTime().isAfter(originalEnd));
        assertEquals("ACTIVE", result.getStatus());
        assertEquals("PENDING", result.getPaymentStatus());
    }

    @Test
    void getUserSubscriptions_shouldReturnList() {
        when(subRepo.findByUserId(10L)).thenReturn(List.of(makeSub(1L, 10L, 1L)));
        assertEquals(1, service.getUserSubscriptions(10L).size());
    }

    @Test
    void getSubscription_shouldReturnSub() {
        when(subRepo.findById(1L)).thenReturn(Optional.of(makeSub(1L, 10L, 1L)));
        assertNotNull(service.getSubscription(1L));
        assertNull(service.getSubscription(99L));
    }

    @Test
    void isSubscriptionValid_shouldCheckStatusAndExpiry() {
        Subscription active = makeSub(1L, 10L, 1L);
        when(subRepo.findByUserIdAndServiceId(10L, 1L)).thenReturn(Optional.of(active));
        assertTrue(service.isSubscriptionValid(10L, 1L));

        // Expired
        Subscription expired = makeSub(2L, 10L, 1L);
        expired.setEndTime(LocalDateTime.now().minusDays(1));
        when(subRepo.findByUserIdAndServiceId(10L, 1L)).thenReturn(Optional.of(expired));
        assertFalse(service.isSubscriptionValid(10L, 1L));

        // Not found
        when(subRepo.findByUserIdAndServiceId(10L, 99L)).thenReturn(Optional.empty());
        assertFalse(service.isSubscriptionValid(10L, 99L));
    }

    @Test
    void paySubscription_notFound_shouldThrow() {
        when(subRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.paySubscription(99L, "ALIPAY", "tx999"));
    }

    @Test
    void cancelSubscription_notFound_shouldThrow() {
        when(subRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.cancelSubscription(99L, "test"));
    }

    @Test
    void renewSubscription_notFound_shouldThrow() {
        when(subRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.renewSubscription(99L));
    }

    @Test
    void createSubscription_serviceNotFound_shouldThrow() {
        when(svcRepo.findById(99L)).thenReturn(Optional.empty());
        Subscription sub = new Subscription();
        sub.setServiceId(99L);
        sub.setUserId(10L);
        assertThrows(RuntimeException.class, () -> service.createSubscription(sub));
    }
}
