// firebase/votes.ts
import { db, ref, set, push } from './firebase';

export interface VoteResult {
    success: boolean;
    voteId?: string;
    error?: string;
}

// Проверка, голосовал ли пользователь уже в этой номинации
export function hasUserVotedInNomination(nominationId: string): boolean {
    try {
        const votedNominations = JSON.parse(localStorage.getItem('voted_nominations') || '{}');
        return !!votedNominations[nominationId];
    } catch {
        return false;
    }
}

// Основная функция отправки голоса
export async function submitVoteToFirebase(
    nominationId: string,
    nomineeId: string,
    nomineeName: string,
    nominationTitle: string,
    voterName: string
): Promise<VoteResult> {
    // Проверяем подключение к Firebase
    if (!db) {
        console.warn('Firebase не доступен, используем localStorage fallback');
        return saveVoteLocally(nominationId, nomineeId, nomineeName, nominationTitle, voterName);
    }

    try {
        // Создаем новую запись в базе данных
        const votesRef = ref(db, 'votes');
        const newVoteRef = push(votesRef);
        const voteId = newVoteRef.key || `vote_${Date.now()}`;
        
        const voteData = {
            id: voteId,
            nominationId,
            nomineeId,
            nomineeName,
            nominationTitle,
            voterName,
            timestamp: Date.now(),
            date: new Date().toISOString(),
            userAgent: navigator.userAgent.substring(0, 200),
            ip: 'anonymous'
        };
        
        await set(newVoteRef, voteData);
        
        console.log('✅ Голос успешно сохранен в Firebase:', {
            nomination: nominationTitle,
            nominee: nomineeName,
            voter: voterName,
            id: voteId
        });
        
        return {
            success: true,
            voteId
        };
        
    } catch (error: any) {
        console.error('❌ Ошибка при сохранении в Firebase:', error);
        
        // Fallback на localStorage если Firebase недоступен
        return saveVoteLocally(nominationId, nomineeId, nomineeName, nominationTitle, voterName);
    }
}

// Fallback на localStorage
function saveVoteLocally(
    nominationId: string,
    nomineeId: string,
    nomineeName: string,
    nominationTitle: string,
    voterName: string
): VoteResult {
    try {
        const voteId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const votes = JSON.parse(localStorage.getItem('local_votes') || '[]');
        
        votes.push({
            id: voteId,
            nominationId,
            nomineeId,
            nomineeName,
            nominationTitle,
            voterName,
            timestamp: Date.now(),
            source: 'localStorage'
        });
        
        localStorage.setItem('local_votes', JSON.stringify(votes));
        
        console.log('📱 Голос сохранен в localStorage (fallback):', {
            nomination: nominationTitle,
            nominee: nomineeName,
            voter: voterName,
            id: voteId
        });
        
        return {
            success: true,
            voteId
        };
        
    } catch (localError) {
        console.error('❌ Ошибка при сохранении в localStorage:', localError);
        
        return {
            success: false,
            error: 'Не удалось сохранить голос. Проверьте настройки браузера.'
        };
    }
}

// Функция для получения статистики (если понадобится)
export function getVoteStats(): { total: number; byNomination: Record<string, number> } {
    try {
        const votes = JSON.parse(localStorage.getItem('local_votes') || '[]');
        const byNomination: Record<string, number> = {};
        
        votes.forEach((vote: any) => {
            byNomination[vote.nominationTitle] = (byNomination[vote.nominationTitle] || 0) + 1;
        });
        
        return {
            total: votes.length,
            byNomination
        };
    } catch {
        return {
            total: 0,
            byNomination: {}
        };
    }
}