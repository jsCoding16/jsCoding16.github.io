document.addEventListener("DOMContentLoaded", () => {
    // === Mapeamento dos botões (IDs) para as opções do resumo (IDs) ===
    const configMapping = {
        // Enchimento (Cushion Filling)
        filling: {
            wrapperId: "wrapper_filling",
            options: {
                "Mole": "opt_lbl_soft",
                "ExtraM": "opt_lbl_extra_soft"
            }
        },
        // Madeiras (Frame Wood)
        wood: {
            wrapperId: "wrapper_wood",
            options: {
                "Mclara": "opt_wood_light_nordic",
                "Mmed": "opt_wood_light_natural",
                "Mmed2": "opt_wood_medium_warm",
                "Mescura": "opt_wood_dark_charcoal"
            }
        },
        // Peles (Leather)
        leather: {
            wrapperId: "wrapper_leather",
            options: {
                "Pele": "opt_leather_ivory",
                "Pele2": "opt_leather_cognac",
                "Pele3": "opt_leather_cocoa",
                "Pele4": "opt_leather_onyx"
            }
        }
    };
    
    const btnOrcamento = document.getElementById("orc");
    const modal = document.getElementById("modal_orcamento");
    const overlay = document.getElementById("modal_overlay");
    const btnClose = document.getElementById("close_modal");

    // === Função Genérica para Atualizar a Visibilidade ===
    function updateSelection(categoryKey, clickedButtonId) {
        const category = configMapping[categoryKey];
        if (!category) return;

        const targetOptionId = category.options[clickedButtonId];
        if (!targetOptionId) return;

        // 1. Procura o wrapper correspondente
        const wrapper = document.getElementById(category.wrapperId);
        if (wrapper) {
            // Seleciona apenas os parágrafos de valor (.tit1) dentro do wrapper para esconder
            const options = wrapper.querySelectorAll("p.tit1");
            options.forEach(el => {
                el.style.setProperty("display", "none", "important");
            });
        }

        // 2. Mostra apenas o elemento selecionado de forma limpa
        const targetElement = document.getElementById(targetOptionId);
        if (targetElement) {
            targetElement.style.setProperty("display", "block", "important");
        }
    }

    // === Adicionar os Event Listeners aos Botões ===

    // Enchimento
    Object.keys(configMapping.filling.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("filling", btnId);
                dispatchMaterialChange("filling", btnId);
            });
        }
    });

    // Madeiras
    Object.keys(configMapping.wood.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("wood", btnId);
                dispatchMaterialChange("wood", btnId);
            });
        }
    });

    // Peles
    Object.keys(configMapping.leather.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("leather", btnId);
                dispatchMaterialChange("leather", btnId);
            });
        }
    });

    // Função auxiliar para comunicar com o teu script do Three.js (se necessário)
    function dispatchMaterialChange(category, optionId) {
        const event = new CustomEvent("materialChanged", {
            detail: { category, optionId }
        });
        window.dispatchEvent(event);
    }
    
    
    
    
    
    
    
    
    // CONFIGURAÇÃO FORMSPREE: Deixa ativo se quiseres testar o e-mail de demo
    const formspreeID = "OS_TEUS_NUMEROS_AQUI"; 

    // Abrir o modal
    if (btnOrcamento) {
        btnOrcamento.addEventListener("click", () => {
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    }

    // Fechar o modal
    const closeModal = () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    };
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);

    // Função para obter a configuração ativa
    function getActiveConfiguration() {
        const activeFilling = document.querySelector("#wrapper_filling p.tit1:not([style*='none'])")?.innerText || "Default";
        const activeWood = document.querySelector("#wrapper_wood p.tit1:not([style*='none'])")?.innerText || "Default";
        const activeLeather = document.querySelector("#wrapper_leather p.tit1:not([style*='none'])")?.innerText || "Default";
        
        return { activeFilling, activeWood, activeLeather };
    }

    // 📩 OPÇÃO 1: Envio Direto (Anónimo de Teste)
    document.getElementById("btn_send_direct")?.addEventListener("click", async () => {
        const { activeFilling, activeWood, activeLeather } = getActiveConfiguration();

        // Dados a enviar (apenas a configuração técnica da poltrona)
        const formData = {
            Mensagem: "Pedido de Demonstração (Sem Dados do Cliente)",
            Enchimento: activeFilling,
            Madeira: activeWood,
            Pele: activeLeather
        };

        const btnDirect = document.getElementById("btn_send_direct");
        const originalText = btnDirect.innerText;
        btnDirect.innerText = "..."; 
        btnDirect.disabled = true;

        try {
            // Se não tiveres o FormspreeID configurado, simulamos apenas o sucesso após 1 segundo
            if (formspreeID === "OS_TEUS_NUMEROS_AQUI") {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simula rede
                alert("Simulação de Envio bem-sucedida! (Nenhum dado pessoal foi recolhido).");
                closeModal();
                return;
            }

            const response = await fetch(`https://formspree.io/f/${formspreeID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Pedido enviado! Receberá a configuração de teste no e-mail registado no Formspree.");
                closeModal();
            } else {
                throw new Error();
            }
        } catch (error) {
            alert("Erro na simulação. Tente novamente.");
        } finally {
            btnDirect.innerText = originalText;
            btnDirect.disabled = false;
        }
    });

    // 🟢 OPÇÃO 2: WhatsApp (Abre com texto pré-definido anónimo)
    document.getElementById("btn_send_whatsapp")?.addEventListener("click", () => {
        const { activeFilling, activeWood, activeLeather } = getActiveConfiguration();
        const numTelefone = "351912345678"; 
        
        const texto = `Olá! Estou a testar o vosso configurador de demonstração e escolhi esta combinação:\n\n` +
                      `- Enchimento: ${activeFilling}\n` +
                      `- Madeira: ${activeWood}\n` +
                      `- Pele: ${activeLeather}`;

        window.open(`https://wa.me/${numTelefone}?text=${encodeURIComponent(texto)}`, '_blank');
        closeModal();
    });

    // ✉️ OPÇÃO 3: E-mail (Abre e-mail com texto pré-definido anónimo)
    document.getElementById("btn_send_email")?.addEventListener("click", () => {
        const { activeFilling, activeWood, activeLeather } = getActiveConfiguration();
        const emailVendedor = "vendas@omeusite.com"; 
        
        const assunto = "Demo - Configuração Selecionada do Recliner";
        const corpo = `Olá!\n\n` +
                      `Esta é uma mensagem gerada na demonstração do vosso configurador com as opções:\n\n` +
                      `- Enchimento: ${activeFilling}\n` +
                      `- Estrutura de Madeira: ${activeWood}\n` +
                      `- Tipo de Pele: ${activeLeather}\n\n` +
                      `Envio de teste.`;

        window.location.href = `mailto:${emailVendedor}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
        closeModal();
    });
    
});
